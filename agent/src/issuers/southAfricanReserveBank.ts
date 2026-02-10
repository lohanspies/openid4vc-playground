import { ClaimFormat, DateOnly, Kms } from '@credo-ts/core'
import { OpenId4VciCredentialFormatProfile } from '@credo-ts/openid4vc'
import { AGENT_HOST } from '../constants.js'
import type { CredentialConfigurationDisplay, PlaygroundIssuerOptions, SdJwtConfiguration } from '../issuer.js'
import type { StaticSdJwtSignInput } from '../types.js'
import { dateToSeconds, oneYearInMilliseconds, serverStartupTimeInMilliseconds, tenDaysInMilliseconds } from '../utils/date.js'

const financialIdentityDisplay = {
  locale: 'en',
  name: 'Financial Identity',
  text_color: '#FFFFFF',
  background_color: '#0B1F3B',
  background_image: {
    url: `${AGENT_HOST}/assets/issuers/za-reserve-bank/credential.png`,
    uri: `${AGENT_HOST}/assets/issuers/za-reserve-bank/credential.png`,
  },
} satisfies CredentialConfigurationDisplay

const financialIdentityPayload = {
  national_id: 'ZA9001015009087',
  account_holder_name: 'Erika Mustermann',
  bank_name: 'SARB',
  bank_code: 'SARB',
  account_number_masked: '****1234',
  account_type: 'Savings',
  residency_country: 'ZA',
  issuance_date: new DateOnly(new Date(serverStartupTimeInMilliseconds - tenDaysInMilliseconds).toISOString()),
  expiry_date: new DateOnly(new Date(serverStartupTimeInMilliseconds + oneYearInMilliseconds).toISOString()),
  issuing_authority: 'SARB',
  issuing_country: 'ZA',
}

export const financialIdentitySdJwt = {
  format: OpenId4VciCredentialFormatProfile.SdJwtDc,
  cryptographic_binding_methods_supported: ['jwk'],
  credential_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
  scope: 'financial-identity-sd-jwt',
  vct: 'urn:za:financial-identity:1',
  display: [financialIdentityDisplay],
  credential_metadata: { display: [financialIdentityDisplay] },
  proof_types_supported: {
    jwt: {
      proof_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
    },
  },
} as const satisfies SdJwtConfiguration

export const financialIdentitySdJwtData = {
  credentialConfigurationId: 'za-financial-identity-sd-jwt',
  format: ClaimFormat.SdJwtDc,
  credential: {
    payload: {
      ...financialIdentityPayload,
      issuance_date: financialIdentityPayload.issuance_date.toISOString(),
      expiry_date: financialIdentityPayload.expiry_date.toISOString(),
      nbf: dateToSeconds(financialIdentityPayload.issuance_date),
      exp: dateToSeconds(financialIdentityPayload.expiry_date),
      vct: financialIdentitySdJwt.vct,
    },
    disclosureFrame: {
      _sd: [
        'national_id',
        'account_holder_name',
        'bank_name',
        'bank_code',
        'account_number_masked',
        'account_type',
        'residency_country',
        'issuance_date',
        'expiry_date',
        'issuing_authority',
        'issuing_country',
      ],
    },
  },
} satisfies StaticSdJwtSignInput

export const southAfricanReserveBankIssuer = {
  tags: [financialIdentityDisplay.name],
  issuerId: 'd7f9c1e1-1c5f-4d64-9c7b-1d1c1fd4c9c4',
  credentialConfigurationsSupported: [
    {
      'dc+sd-jwt': {
        configuration: financialIdentitySdJwt,
        data: financialIdentitySdJwtData,
      },
    },
  ],
  batchCredentialIssuance: {
    batchSize: 10,
  },
  display: [
    {
      name: 'SARB',
      logo: {
        url: `${AGENT_HOST}/assets/issuers/za-reserve-bank/issuer.jpg`,
        uri: `${AGENT_HOST}/assets/issuers/za-reserve-bank/issuer.jpg`,
      },
    },
  ],
} satisfies PlaygroundIssuerOptions

export const southAfricanReserveBankCredentialsData = {
  [financialIdentitySdJwtData.credentialConfigurationId]: financialIdentitySdJwtData,
}
