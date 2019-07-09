import * as yaml from 'js-yaml';
import { expect } from 'chai';

import 'mocha';
const pulumiConfig = yaml.safeLoad(require('fs').readFileSync('./Pulumi.unit-test.yaml', 'utf8'));

process.env.PULUMI_CONFIG = JSON.stringify(pulumiConfig.config);
process.env.PULUMI_TEST_MODE = 'true';
process.env.PULUMI_NODEJS_STACK = 'stack-name';
process.env.PULUMI_NODEJS_PROJECT = 'infra-eks';

import * as index from '../index';
index.kubeconfig;