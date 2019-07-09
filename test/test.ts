
process.env.PULUMI_TEST_MODE = 'true';
process.env.PULUMI_NODEJS_STACK = 'stack-name';
process.env.PULUMI_NODEJS_PROJECT = 'infra-eks';

import * as yaml from 'js-yaml';
import { expect } from 'chai';
import * as pulumi from "@pulumi/pulumi";
import 'mocha';

const pulumiConfig = yaml.safeLoad(require('fs').readFileSync('./Pulumi.unit-test.yaml', 'utf8'));
process.env.PULUMI_CONFIG = JSON.stringify(pulumiConfig.config);

import * as index from '../index';

describe('#EKS Cluster Deployment', () => {
    let cluster = index.cluster;
    it('Should Deploy EKS Cluster', (done) => {
        cluster.eksCluster.version.apply(([version]) => asyncDone(() => {
            expect(version).to.equals('should fail');
        }, done));
    });
});

const asyncDone = (testFn: Function, done: Function) => {
    try {
        testFn();

        done();
    } catch (err) {
        done(err);
    }
}