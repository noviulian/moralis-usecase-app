import { Core } from '@moralisweb3/common-core';
import { EvmApi } from '@moralisweb3/evm-api';
import {Auth} from '@moralisweb3/auth'
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { ApiUtils } from '@moralisweb3/api-utils';

const core = Core.create();
const evmUtils = CommonEvmUtils.create(core);
const evmApi = EvmApi.create(core);
const authApi = Auth.create(core);
const apiUtils = ApiUtils.create(core);
core.registerModules([evmUtils, evmApi, apiUtils, authApi]);

core.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export const moralis = {
    evmApi,
    authApi,
};




