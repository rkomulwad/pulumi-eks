import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const name = "helloworld";

// Create an EKS cluster with non-default configuration
const vpc = new awsx.ec2.Vpc("vpc", { subnets: [{ type: "public" }] });
export const cluster = new eks.Cluster(name, {
        vpcId: vpc.id,
        subnetIds: vpc.publicSubnetIds,
        desiredCapacity: 1,
        minSize: 1,
        maxSize: 2,
        storageClasses: "gp2",
        deployDashboard: false,
    });

export const kubeconfig = cluster.kubeconfig;