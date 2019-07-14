import { expect } from 'chai';
import { promise } from './';
import { cluster } from '../';

describe('#EKS Cluster Deployment', () => {
    it('Should Deploy EKS Cluster', async () => {
        const version = await promise(cluster.eksCluster.version);
        expect(version).to.equals("should fail");
    });
});
