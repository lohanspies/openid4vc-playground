import type { PlaygroundIssuerOptions } from '../issuer.js'
import { bdrCredentialsData, bdrIssuer } from './bdr.js'
import { kolnCredentialsData, kolnIssuer } from './koln.js'
import { medicalOrgCredentialsData, medicalOrgIssuer } from './medicalOrg.js'
import { mvrcCredentialsData, mvrcIssuer } from './mvrc.js'
import { nsfasCredentialsData, nsfasIssuer } from './nsfas.js'
import { saqaCredentialsData, saqaIssuer } from './saqa.js'
import { southAfricanGovernmentCredentialsData, southAfricanGovernmentIssuer } from './southAfricanGovernment.js'
import {
  southAfricanReserveBankCredentialsData,
  southAfricanReserveBankIssuer,
} from './southAfricanReserveBank.js'
import {
  southAfricanRevenueServiceCredentialsData,
  southAfricanRevenueServiceIssuer,
} from './southAfricanRevenueService.js'
import { steuernCredentialsData, steuernIssuer } from './steuern.js'
import { telOrgCredentialsData, telOrgIssuer } from './telOrg.js'
import { utopiaGovernmentData, utopiaGovernmentIssuer } from './utopiaGovernment.js'

export const issuers: PlaygroundIssuerOptions[] = [
  bdrIssuer,
  kolnIssuer,
  steuernIssuer,
  medicalOrgIssuer,
  telOrgIssuer,
  mvrcIssuer,
  utopiaGovernmentIssuer,
  southAfricanGovernmentIssuer,
  southAfricanReserveBankIssuer,
  southAfricanRevenueServiceIssuer,
  nsfasIssuer,
  saqaIssuer,
]

export const issuersCredentialsData = {
  ...bdrCredentialsData,
  ...kolnCredentialsData,
  ...steuernCredentialsData,
  ...medicalOrgCredentialsData,
  ...telOrgCredentialsData,
  ...mvrcCredentialsData,
  ...utopiaGovernmentData,
  ...southAfricanGovernmentCredentialsData,
  ...southAfricanReserveBankCredentialsData,
  ...southAfricanRevenueServiceCredentialsData,
  ...nsfasCredentialsData,
  ...saqaCredentialsData,
}
