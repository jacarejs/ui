import contracts from './contracts.json'

export function getContract(name) {
  return contracts[name] || { props: {}, slots: [], emits: [] }
}

export { contracts }
