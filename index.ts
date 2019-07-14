import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";
import { runTests } from "./test";

const name = "helloworld";

// Create an EKS cluster with non-default configuration
const vpc = new awsx.ec2.Vpc("vpc", { subnets: [{ type: "public" }] });
export const cluster = new eks.Cluster(name, {
        vpcId: vpc.id,
        subnetIds: vpc.publicSubnetIds,
        desiredCapacity: 2,
        minSize: 1,
        maxSize: 2,
        storageClasses: "gp2",
        deployDashboard: false,
    });

// Finally, run the unit tests to check our deployment (during previews and updates).
runTests();
