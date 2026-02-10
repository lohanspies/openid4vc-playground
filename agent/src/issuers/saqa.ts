import { ClaimFormat, DateOnly, Kms } from '@credo-ts/core'
import { OpenId4VciCredentialFormatProfile } from '@credo-ts/openid4vc'
import { AGENT_HOST } from '../constants.js'
import type { CredentialConfigurationDisplay, PlaygroundIssuerOptions, SdJwtConfiguration } from '../issuer.js'
import type { StaticSdJwtSignInput } from '../types.js'
import { dateToSeconds, oneYearInMilliseconds, serverStartupTimeInMilliseconds, tenDaysInMilliseconds } from '../utils/date.js'

const saqaDisplay = {
  locale: 'en',
  name: 'SAQA Qualification',
  text_color: '#132128',
  background_color: '#F4F7F9',
} satisfies CredentialConfigurationDisplay

const saqaQualificationPayload = {
  given_name: 'Johan',
  family_name: 'Du Preez',
  national_id: 'ZA9001015009087',
  qualification_title: 'National Diploma: Information Technology',
  qualification_id: 'SAQA-789012',
  nqf_level: '6',
  awarding_institution: 'Pretoria Technical College',
  issuing_authority: 'SAQA',
  issuing_country: 'ZA',
  issuance_date: new DateOnly(new Date(serverStartupTimeInMilliseconds - tenDaysInMilliseconds).toISOString()),
  expiry_date: new DateOnly(new Date(serverStartupTimeInMilliseconds + oneYearInMilliseconds).toISOString()),
}

export const saqaQualificationSdJwt = {
  format: OpenId4VciCredentialFormatProfile.SdJwtDc,
  cryptographic_binding_methods_supported: ['jwk'],
  credential_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
  scope: 'saqa-qualification-sd-jwt',
  vct: 'urn:za:saqa-qualification:1',
  display: [saqaDisplay],
  credential_metadata: { display: [saqaDisplay] },
  proof_types_supported: {
    jwt: {
      proof_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
    },
  },
} as const satisfies SdJwtConfiguration

export const saqaQualificationSdJwtData = {
  credentialConfigurationId: 'saqa-qualification-sd-jwt',
  format: ClaimFormat.SdJwtDc,
  credential: {
    payload: {
      ...saqaQualificationPayload,
      issuance_date: saqaQualificationPayload.issuance_date.toISOString(),
      expiry_date: saqaQualificationPayload.expiry_date.toISOString(),
      nbf: dateToSeconds(saqaQualificationPayload.issuance_date),
      exp: dateToSeconds(saqaQualificationPayload.expiry_date),
      vct: saqaQualificationSdJwt.vct,
    },
    disclosureFrame: {
      _sd: [
        'given_name',
        'family_name',
        'national_id',
        'qualification_title',
        'qualification_id',
        'nqf_level',
        'awarding_institution',
        'issuance_date',
        'expiry_date',
        'issuing_authority',
        'issuing_country',
      ],
    },
  },
} satisfies StaticSdJwtSignInput

export const saqaIssuer = {
  tags: [saqaDisplay.name],
  issuerId: '7cdd9c7b-d8b5-4b6b-b3fd-5e27fc8b0a1c',
  credentialConfigurationsSupported: [
    {
      'dc+sd-jwt': {
        configuration: saqaQualificationSdJwt,
        data: saqaQualificationSdJwtData,
      },
    },
  ],
  batchCredentialIssuance: {
    batchSize: 10,
  },
  display: [
    {
      name: 'SAQA',
      logo: {
        url: `${AGENT_HOST}/assets/issuers/saqa/issuer.png`,
        uri: `${AGENT_HOST}/assets/issuers/saqa/issuer.png`,
      },
    },
  ],
} satisfies PlaygroundIssuerOptions

export const saqaCredentialsData = {
  [saqaQualificationSdJwtData.credentialConfigurationId]: saqaQualificationSdJwtData,
}
