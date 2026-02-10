import { ClaimFormat, DateOnly, Kms } from '@credo-ts/core'
import { OpenId4VciCredentialFormatProfile } from '@credo-ts/openid4vc'
import { AGENT_HOST } from '../constants.js'
import type { CredentialConfigurationDisplay, PlaygroundIssuerOptions, SdJwtConfiguration } from '../issuer.js'
import type { StaticSdJwtSignInput } from '../types.js'
import { dateToSeconds, oneYearInMilliseconds, serverStartupTimeInMilliseconds, tenDaysInMilliseconds } from '../utils/date.js'

const taxIdDisplay = {
  locale: 'en',
  name: 'ZA Tax ID',
  text_color: '#0A2A43',
  background_color: '#E8F0F6',
  background_image: {
    url: `${AGENT_HOST}/assets/issuers/za-sars/credential.png`,
    uri: `${AGENT_HOST}/assets/issuers/za-sars/credential.png`,
  },
} satisfies CredentialConfigurationDisplay

const taxIdPayload = {
  tax_number: '9876543210',
  registered_family_name: 'Mustermann',
  registered_given_name: 'Erika',
  resident_address: '1 Pretoria Rd, Pretoria',
  birth_date: new DateOnly('1986-03-14'),
  affiliation_country: 'ZA',
  issuing_authority: 'SARS',
  issuing_country: 'ZA',
  issuance_date: new DateOnly(new Date(serverStartupTimeInMilliseconds - tenDaysInMilliseconds).toISOString()),
  expiry_date: new DateOnly(new Date(serverStartupTimeInMilliseconds + oneYearInMilliseconds).toISOString()),
}

export const zaTaxIdSdJwt = {
  format: OpenId4VciCredentialFormatProfile.SdJwtDc,
  cryptographic_binding_methods_supported: ['jwk'],
  credential_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
  scope: 'za-tax-id-sd-jwt',
  vct: 'urn:za:tax-id:1',
  display: [taxIdDisplay],
  credential_metadata: { display: [taxIdDisplay] },
  proof_types_supported: {
    jwt: {
      proof_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
    },
  },
} as const satisfies SdJwtConfiguration

export const zaTaxIdSdJwtData = {
  credentialConfigurationId: 'za-tax-id-sd-jwt',
  format: ClaimFormat.SdJwtDc,
  credential: {
    payload: {
      ...taxIdPayload,
      birth_date: taxIdPayload.birth_date.toISOString(),
      issuance_date: taxIdPayload.issuance_date.toISOString(),
      expiry_date: taxIdPayload.expiry_date.toISOString(),
      nbf: dateToSeconds(taxIdPayload.issuance_date),
      exp: dateToSeconds(taxIdPayload.expiry_date),
      vct: zaTaxIdSdJwt.vct,
    },
    disclosureFrame: {
      _sd: [
        'tax_number',
        'registered_family_name',
        'registered_given_name',
        'resident_address',
        'birth_date',
        'affiliation_country',
        'issuance_date',
        'expiry_date',
        'issuing_authority',
        'issuing_country',
      ],
    },
  },
} satisfies StaticSdJwtSignInput

export const southAfricanRevenueServiceIssuer = {
  tags: [taxIdDisplay.name],
  issuerId: 'c0d0b964-2b02-4d42-8ed8-67f44949b2bd',
  credentialConfigurationsSupported: [
    {
      'dc+sd-jwt': {
        configuration: zaTaxIdSdJwt,
        data: zaTaxIdSdJwtData,
      },
    },
  ],
  batchCredentialIssuance: {
    batchSize: 10,
  },
  display: [
    {
      name: 'SARS',
      logo: {
        url: `${AGENT_HOST}/assets/issuers/za-sars/issuer.png`,
        uri: `${AGENT_HOST}/assets/issuers/za-sars/issuer.png`,
      },
    },
  ],
} satisfies PlaygroundIssuerOptions

export const southAfricanRevenueServiceCredentialsData = {
  [zaTaxIdSdJwtData.credentialConfigurationId]: zaTaxIdSdJwtData,
}
