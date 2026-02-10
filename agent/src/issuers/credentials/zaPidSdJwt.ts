import { ClaimFormat, Kms } from '@credo-ts/core'
import { OpenId4VciCredentialFormatProfile } from '@credo-ts/openid4vc'
import { AGENT_HOST } from '../../constants.js'
import type { SdJwtConfiguration } from '../../issuer.js'
import type { StaticSdJwtSignInput } from '../../types.js'
import {
  dateToSeconds,
  oneYearInMilliseconds,
  serverStartupTimeInMilliseconds,
  tenDaysInMilliseconds,
} from '../../utils/date.js'
import { loadJPEGBufferSync } from '../../utils/image.js'

const issuanceDate = new Date(serverStartupTimeInMilliseconds - tenDaysInMilliseconds)
const expirationDate = new Date(serverStartupTimeInMilliseconds + oneYearInMilliseconds)
const erikaPortrait = loadJPEGBufferSync(`${import.meta.dirname}/../../../assets/erika.jpeg`)
const johanPortrait = loadJPEGBufferSync(`${import.meta.dirname}/../../../assets/johan.jpeg`)

const zaPidSdJwtDisplay = {
  locale: 'en',
  name: 'ZA PID',
  text_color: '#2F3544',
  background_color: '#F1F2F0',
  background_image: {
    url: `${AGENT_HOST}/assets/credentials/pid.png`,
    uri: `${AGENT_HOST}/assets/credentials/pid.png`,
  },
} as const

export const zaPidSdJwt = {
  format: OpenId4VciCredentialFormatProfile.SdJwtDc,
  cryptographic_binding_methods_supported: ['jwk'],
  credential_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
  scope: 'za-pid-sd-jwt',
  vct: 'urn:eudi:pid:1',
  display: [zaPidSdJwtDisplay],
  credential_metadata: { display: [zaPidSdJwtDisplay] },
  proof_types_supported: {
    jwt: {
      proof_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
    },
  },
} satisfies SdJwtConfiguration

export const zaPidSdJwtData = {
  credentialConfigurationId: 'za-pid-sd-jwt',
  format: ClaimFormat.SdJwtDc,
  credential: {
    payload: {
      vct: zaPidSdJwt.vct,

      // Mandatory attributes (Section 2.2)
      family_name: 'Du Preez',
      given_name: 'Johan',
      birthdate: '1964-08-12',
      place_of_birth: {
        country: 'ZA',
        region: 'Gauteng',
        locality: 'Pretoria',
      },
      nationalities: ['ZA'],

      // Optional attributes (Section 2.3)
      address: {
        formatted: '1 Government Ave, 0001 Pretoria',
        street_address: 'Government Ave',
        house_number: '1',
        locality: 'Pretoria',
        region: 'Gauteng',
        postal_code: '0001',
        country: 'ZA',
      },
      portrait: `data:image/jpeg;base64,${johanPortrait.toString('base64')}`,

      // Mandatory metadata (Section 2.4)
      date_of_expiry: expirationDate.toISOString().split('T')[0],
      issuing_authority: 'Department of Home Affairs',
      issuing_country: 'ZA',

      // Optional metadata (Section 2.6)
      date_of_issuance: issuanceDate.toISOString().split('T')[0],

      // Technical validity period
      nbf: dateToSeconds(issuanceDate),
      exp: dateToSeconds(expirationDate),
    },
    disclosureFrame: {
      _sd: ['family_name', 'given_name', 'birthdate', 'nationalities', 'portrait', 'date_of_issuance'],
      place_of_birth: {
        _sd: ['country', 'region', 'locality'],
      },
      address: {
        _sd: ['formatted', 'street_address', 'house_number', 'locality', 'region', 'postal_code', 'country'],
      },
    },
  },
} satisfies StaticSdJwtSignInput
