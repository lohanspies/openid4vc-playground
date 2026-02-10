import { ClaimFormat, DateOnly, Kms } from '@credo-ts/core'
import { OpenId4VciCredentialFormatProfile } from '@credo-ts/openid4vc'
import { AGENT_HOST } from '../constants.js'
import type { CredentialConfigurationDisplay, PlaygroundIssuerOptions, SdJwtConfiguration } from '../issuer.js'
import type { StaticSdJwtSignInput } from '../types.js'
import { dateToSeconds, oneYearInMilliseconds, serverStartupTimeInMilliseconds, tenDaysInMilliseconds } from '../utils/date.js'

const nsfasDisplay = {
  locale: 'en',
  name: 'myNSFAS ID',
  text_color: '#0B1F3B',
  background_color: '#F1F7FF',
  background_image: {
    url: `${AGENT_HOST}/assets/issuers/nsfas/credential.png`,
    uri: `${AGENT_HOST}/assets/issuers/nsfas/credential.png`,
  },
} satisfies CredentialConfigurationDisplay

const nsfasPayload = {
  given_name: 'Erika',
  family_name: 'Mustermann',
  national_id: 'ZA9001015009087',
  nsfas_student_number: 'NSFAS-2025-000123',
  issuing_authority: 'NSFAS',
  issuing_country: 'ZA',
  issuance_date: new DateOnly(new Date(serverStartupTimeInMilliseconds - tenDaysInMilliseconds).toISOString()),
  expiry_date: new DateOnly(new Date(serverStartupTimeInMilliseconds + oneYearInMilliseconds).toISOString()),
}

export const nsfasIdSdJwt = {
  format: OpenId4VciCredentialFormatProfile.SdJwtDc,
  cryptographic_binding_methods_supported: ['jwk'],
  credential_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
  scope: 'nsfas-id-sd-jwt',
  vct: 'urn:za:nsfas-id:1',
  display: [nsfasDisplay],
  credential_metadata: { display: [nsfasDisplay] },
  proof_types_supported: {
    jwt: {
      proof_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
    },
  },
} as const satisfies SdJwtConfiguration

export const nsfasIdSdJwtData = {
  credentialConfigurationId: 'nsfas-id-sd-jwt',
  format: ClaimFormat.SdJwtDc,
  credential: {
    payload: {
      ...nsfasPayload,
      issuance_date: nsfasPayload.issuance_date.toISOString(),
      expiry_date: nsfasPayload.expiry_date.toISOString(),
      nbf: dateToSeconds(nsfasPayload.issuance_date),
      exp: dateToSeconds(nsfasPayload.expiry_date),
      vct: nsfasIdSdJwt.vct,
    },
    disclosureFrame: {
      _sd: [
        'given_name',
        'family_name',
        'national_id',
        'nsfas_student_number',
        'issuance_date',
        'expiry_date',
        'issuing_authority',
        'issuing_country',
      ],
    },
  },
} satisfies StaticSdJwtSignInput

export const nsfasIssuer = {
  tags: [nsfasDisplay.name],
  issuerId: '3dbb3bb9-d7a5-4c2d-8f7a-02e2b7e1e00b',
  credentialConfigurationsSupported: [
    {
      'dc+sd-jwt': {
        configuration: nsfasIdSdJwt,
        data: nsfasIdSdJwtData,
      },
    },
  ],
  batchCredentialIssuance: {
    batchSize: 10,
  },
  display: [
    {
      name: 'NSFAS',
      logo: {
        url: `${AGENT_HOST}/assets/issuers/nsfas/issuer.png`,
        uri: `${AGENT_HOST}/assets/issuers/nsfas/issuer.png`,
      },
    },
  ],
} satisfies PlaygroundIssuerOptions

export const nsfasCredentialsData = {
  [nsfasIdSdJwtData.credentialConfigurationId]: nsfasIdSdJwtData,
}
