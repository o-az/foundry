// Base interfaces
type BaseCommand = Partial<{
  help: boolean
  version: boolean
}>

type GlobalOptions = Partial<{
  root: string
  config: string
  etherscan_api_key: string
  verbosity: 'silent' | 'normal' | 'verbose' | 'debug' | 'trace'
}>

// Common shared interfaces
type EVMOptions = Partial<{
  via_ir: boolean
  evm_version: 'london' | 'paris' | 'shanghai' | 'cancun'
}>

type CompilerOptions = Partial<{
  use: string
  out: string
  offline: boolean
  optimize: boolean
  optimizer_runs: number
  no_auto_detect: boolean
  libraries: Array<string>
  remappings: Array<string>
  ignored_error_codes: Array<string>
}>

type WalletOptions = {
  private_key: string
} & Partial<{
  from: string
  mnemonic: string
  keystore: string
  hd_wallet: boolean
  mnemonic_index: number
  hd_wallet_path: string
  keystore_password: string
  mnemonic_passphrase: string
  mnemonic_derivation_path: string
}>

type TransactionOptions = Partial<{
  value: string
  nonce: number
  legacy: boolean
  rpc_url: string
  gas_price: number
  gas_limit: number
  priority_gas_price: number
}>

type TestMatchOptions = Partial<{
  match: string
  no_match: string
  match_path: string
  no_match_path: string
}>

type BlockOptions = Partial<{
  block_number: number
  block_coinbase: string
  block_timestamp: number
  block_gas_limit: number
  block_difficulty: number
  block_base_fee_per_gas: number
}>

// Command interfaces
type BuildCommand = BaseCommand &
  GlobalOptions &
  EVMOptions &
  CompilerOptions & {
    command: 'build'
  } & Partial<{
    watch: boolean
    force: boolean
    silent: boolean
    skip: Array<string>
    build_info: boolean
    paths: Array<string>
    deny_warnings: boolean
    build_info_path: string
    extra_output: Array<string>
    extra_output_files: Array<string>
    revert_strings: 'default' | 'strip' | 'debug' | 'verboseDebug'
  }>

type TestCommand = BaseCommand &
  GlobalOptions &
  EVMOptions &
  CompilerOptions &
  TestMatchOptions &
  BlockOptions & {
    command: 'test'
  } & Partial<{
    ffi: boolean
    list: boolean
    json: boolean
    watch: boolean
    debug: boolean
    sender: string
    fork_url: string
    fuzz_seed: string
    detailed: boolean
    fuzz_runs: number
    fail_fast: boolean
    gas_report: boolean
    memory_limit: number
    allow_failure: boolean
    initial_balance: string
    fork_block_number: number
    no_storage_caching: boolean
    fuzz_max_local_rejects: number
    fuzz_max_global_rejects: number
    evm_type: 'sputnik' | 'evmodin'
  }>

type CreateCommand = BaseCommand &
  EVMOptions &
  WalletOptions &
  GlobalOptions &
  CompilerOptions &
  TransactionOptions & {
    command: 'create'
  } & Partial<{
    json: boolean
    verify: boolean
    contract: string
    interactive: boolean
    constructor_args_path: string
    constructor_args: Array<string>
  }>

type DeployCommand = BaseCommand &
  EVMOptions &
  GlobalOptions &
  WalletOptions &
  CompilerOptions &
  TransactionOptions & {
    command: 'deploy'
  } & Partial<{
    sig: string
    json: boolean
    slow: boolean
    script: string
    verify: boolean
    resume: boolean
    broadcast: boolean
  }>

type VerifyCommand = BaseCommand &
  GlobalOptions &
  EVMOptions &
  CompilerOptions & {
    command: 'verify'
  } & Partial<{
    watch: boolean
    retry: boolean
    address: string
    contract: string
    flatten: boolean
    chain: string | number
    constructor_args: string
    compiler_version: string
    num_of_optimizations: number
    constructor_args_path: string
  }>

interface CleanCommand extends BaseCommand, GlobalOptions {
  command: 'clean'
}

type SnapshotCommand = BaseCommand &
  GlobalOptions &
  EVMOptions &
  CompilerOptions &
  TestMatchOptions & {
    command: 'snapshot'
  } & Partial<{
    snap: string
    diff: boolean
    check: boolean
    format: 'pretty' | 'json'
  }>

type InitCommand = BaseCommand &
  GlobalOptions & {
    command: 'init'
  } & Partial<{
    branch: string
    force: boolean
    quiet: boolean
    no_git: boolean
    template: string
    no_commit: boolean
  }>

type InspectCommand = BaseCommand &
  EVMOptions &
  GlobalOptions &
  CompilerOptions & {
    command: 'inspect'
  } & Partial<{
    pretty: boolean
    contract: string
    field:
      | 'abi'
      | 'methods'
      | 'bytecode'
      | 'metadata'
      | 'gas-estimates'
      | 'storage-layout'
      | 'deployedBytecode'
  }>

interface RemappingsCommand extends BaseCommand, GlobalOptions {
  command: 'remappings'
  pretty?: boolean
}

interface CompletionsCommand extends BaseCommand {
  command: 'completions'
  shell: 'bash' | 'elvish' | 'fish' | 'powershell' | 'zsh'
}

type GenerateCommand = BaseCommand &
  GlobalOptions & {
    command: 'generate'
    subcommand: 'test' | 'completion' | 'reference'
  } & Partial<{
    path: string
    name: string
    contract: string
    shell: 'bash' | 'elvish' | 'fish' | 'powershell' | 'zsh'
  }>

type ConfigCommand = BaseCommand &
  GlobalOptions & {
    command: 'config'
  } & Partial<{
    json: boolean
    basic: boolean
  }>

type FlattenCommand = BaseCommand &
  GlobalOptions &
  CompilerOptions & {
    command: 'flatten'
  } & Partial<{
    output: string
    contracts: Array<string>
  }>

type FormatCommand = BaseCommand &
  GlobalOptions & {
    command: 'format'
  } & Partial<{
    file: string
    raw: boolean
    check: boolean
  }>

type BindCommand = BaseCommand &
  EVMOptions &
  GlobalOptions &
  CompilerOptions & {
    command: 'bind'
  } & Partial<{
    module: boolean
    bindings: string
    crate_name: string
    overwrite: boolean
    skip_build: boolean
    single_file: boolean
    crate_version: string
    skip_cargo_toml: boolean
  }>

interface CacheCommand extends BaseCommand, GlobalOptions {
  command: 'cache'
  blocks?: boolean
  subcommand: 'clean' | 'ls'
}

type DebugCommand = BaseCommand &
  GlobalOptions &
  EVMOptions &
  CompilerOptions & {
    command: 'debug'
  } & Partial<{
    sig: string
    debug: boolean
    trace: boolean
    args: Array<string>
    debug_artifacts: string
  }>

// Union type of all possible commands
export type ForgeCommand =
  | BuildCommand
  | TestCommand
  | CreateCommand
  | DeployCommand
  | VerifyCommand
  | CleanCommand
  | SnapshotCommand
  | InitCommand
  | InspectCommand
  | RemappingsCommand
  | CompletionsCommand
  | GenerateCommand
  | ConfigCommand
  | FlattenCommand
  | FormatCommand
  | BindCommand
  | CacheCommand
  | DebugCommand
