import { ClaimFormat, Kms, type NonEmptyArray } from '@credo-ts/core'
import { OpenId4VciCredentialFormatProfile } from '@credo-ts/openid4vc'
import type { CredentialConfigurationClaims, CredentialConfigurationDisplay, MdocConfiguration } from '../../issuer.js'
import type { StaticMdocSignInput } from '../../types.js'
import { oneYearInMilliseconds, serverStartupTimeInMilliseconds, tenDaysInMilliseconds } from '../../utils/date.js'

const issuanceDate = new Date(serverStartupTimeInMilliseconds - tenDaysInMilliseconds)
const expirationDate = new Date(serverStartupTimeInMilliseconds + oneYearInMilliseconds)

const zaAgeMdocDisplays = [
  {
    locale: 'en',
    name: 'ZA Age',
    text_color: '#2F3544',
    background_color: '#F1F2F0',
  },
] satisfies NonEmptyArray<CredentialConfigurationDisplay>

const zaAgeMdocClaims = [
  {
    path: ['eu.europa.ec.av.1', 'age_over_18'],
    display: [{ locale: 'en', name: 'Age over 18' }],
  },
] satisfies CredentialConfigurationClaims

export const zaAgeMdoc = {
  format: OpenId4VciCredentialFormatProfile.MsoMdoc,
  cryptographic_binding_methods_supported: ['cose_key'],
  credential_signing_alg_values_supported: [Kms.KnownCoseSignatureAlgorithms.ESP256],
  scope: 'proof_of_age',
  doctype: 'eu.europa.ec.av.1',
  display: zaAgeMdocDisplays,
  claims: zaAgeMdocClaims,
  credential_metadata: {
    display: zaAgeMdocDisplays,
    claims: zaAgeMdocClaims,
  },
  proof_types_supported: {
    jwt: {
      proof_signing_alg_values_supported: [Kms.KnownJwaSignatureAlgorithms.ES256],
    },
  },
} satisfies MdocConfiguration

export const zaAgeMdocData = {
  credentialConfigurationId: 'za-age-mdoc',
  format: ClaimFormat.MsoMdoc,
  credential: {
    docType: zaAgeMdoc.doctype,
    validityInfo: {
      signed: issuanceDate,
      validFrom: issuanceDate,
      validUntil: expirationDate,
    },
    namespaces: {
      [zaAgeMdoc.doctype]: {
        age_over_18: true,
      },
    },
  },
} satisfies StaticMdocSignInput
