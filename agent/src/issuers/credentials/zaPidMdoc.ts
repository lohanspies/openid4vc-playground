import { ClaimFormat, DateOnly, Kms } from '@credo-ts/core'
import { OpenId4VciCredentialFormatProfile } from '@credo-ts/openid4vc'
import { AGENT_HOST } from '../../constants.js'
import type { MdocConfiguration } from '../../issuer.js'
import type { StaticMdocSignInput } from '../../types.js'
import { oneYearInMilliseconds, serverStartupTimeInMilliseconds } from '../../utils/date.js'
import { loadJPEGBufferSync } from '../../utils/image.js'

const erikaPortrait = loadJPEGBufferSync(`${import.meta.dirname}/../../../assets/erika.jpeg`)
const johanPortrait = loadJPEGBufferSync(`${import.meta.dirname}/../../../assets/johan.jpeg`)

const issuanceDate = new DateOnly()
const expiryDate = new DateOnly('2030-01-28')

const zaPidPayload = {
  family_name: 'Du Preez',
  given_name: 'Johan',
  birth_date: new DateOnly('1964-08-12'),
  place_of_birth: {
    country: 'ZA',
    region: 'Gauteng',
    locality: 'Pretoria',
  },
  nationality: ['ZA'],

  resident_address: '1 Government Ave, 0001 Pretoria',
  resident_country: 'ZA',
  resident_state: 'Gauteng',
  resident_city: 'Pretoria',
  resident_postal_code: '0001',
  resident_street: 'Government Ave',
  resident_house_number: '1',
  personal_administrative_number: '123456782',
  portrait: new Uint8Array(johanPortrait),
  family_name_birth: 'Du Preez',
  given_name_birth: 'Johan',
  sex: 2,
  email_address: 'johan@dupreez.za',
  mobile_phone_number: '+27123456789',

  expiry_date: expiryDate,
  issuing_authority: 'Department of Home Affairs',
  issuing_country: 'ZA',

  document_number: 'ZA01234567',
  issuance_date: issuanceDate,
}

const zaPidMdocDisplay = {
  locale: 'en',
  name: 'ZA PID',
  text_color: '#2F3544',
  background_color: '#F1F2F0',
  background_image: {
    url: `${AGENT_HOST}/assets/credentials/pid.png`,
    uri: `${AGENT_HOST}/assets/credentials/pid.png`,
  },
} as const

export const zaPidMdoc = {
  format: OpenId4VciCredentialFormatProfile.MsoMdoc,
  cryptographic_binding_methods_supported: ['cose_key'],
  credential_signing_alg_values_supported: [Kms.KnownCoseSignatureAlgorithms.ESP256],
  scope: 'za-pid-mdoc',
  doctype: 'eu.europa.ec.eudi.pid.1',
  display: [zaPidMdocDisplay],
  credential_metadata: { display: [zaPidMdocDisplay] },
  proof_types_supported: {
    jwt: {
      proof_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
    },
  },
} as const satisfies MdocConfiguration

export const zaPidMdocData = {
  credentialConfigurationId: 'za-pid-mdoc',
  format: ClaimFormat.MsoMdoc,
  credential: {
    docType: zaPidMdoc.doctype,
    namespaces: {
      [zaPidMdoc.doctype]: {
        ...zaPidPayload,
      },
    },
    validityInfo: {
      validFrom: new Date(zaPidPayload.issuance_date.toISOString()),
      validUntil: new Date(serverStartupTimeInMilliseconds + oneYearInMilliseconds),
      expectedUpdate: new Date(serverStartupTimeInMilliseconds + Math.floor(oneYearInMilliseconds / 2)),
      signed: new Date(zaPidPayload.issuance_date.toISOString()),
    },
  },
} satisfies StaticMdocSignInput
