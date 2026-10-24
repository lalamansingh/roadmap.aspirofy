import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'kubernetes',
  title: 'Kubernetes',
  short: 'Orchestrate containers reliably at any scale.',
  description:
    'Learn how to deploy, expose, scale, and operate containerised workloads on Kubernetes. Moves from core objects through networking, storage, security, and day-two operations.',
  category: 'skill',
  accent: '#326ce5',
  tags: ['containers', 'orchestration', 'cloud-native'],
  query: 'kubernetes',
  sections: [
    {
      title: 'Getting Started',
      level: 'beginner',
      description: 'The mental model and a cluster to experiment on.',
      topics: [
        ['Why orchestration', 1, 'The problems schedulers solve: placement, self-healing, scaling, and rollouts.'],
        ['Cluster architecture', 3, 'Control plane components, worker nodes, the kubelet, and how etcd stores state.', 'https://kubernetes.io/docs/concepts/architecture/'],
        ['Local clusters', 2, 'Spin up a practice cluster with kind, minikube, or k3d.', 'https://kind.sigs.k8s.io/'],
        ['kubectl essentials', 3, 'Get, describe, apply, logs, and exec for daily cluster interaction.', 'https://kubernetes.io/docs/reference/kubectl/'],
        ['Declarative manifests', 2, 'Write YAML objects and let the API server reconcile desired state.'],
      ],
    },
    {
      title: 'Core Workloads',
      level: 'beginner',
      description: 'The objects that actually run your containers.',
      topics: [
        ['Pods', 2, 'The smallest deployable unit, including multi-container and init-container patterns.', 'https://kubernetes.io/docs/concepts/workloads/pods/'],
        ['Deployments & ReplicaSets', 3, 'Keep a set of identical pods running and roll out new versions safely.', 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/'],
        ['StatefulSets', 2, 'Stable identities and storage for databases and other stateful services.'],
        ['DaemonSets', 1, 'Run one pod per node for agents such as log shippers and monitors.'],
        ['Jobs & CronJobs', 2, 'Run batch tasks to completion, once or on a schedule.'],
        ['Labels, selectors & namespaces', 2, 'Organise and target resources, and divide a cluster into logical areas.'],
      ],
      project: {
        title: 'Deploy a stateless web app',
        description: 'Run a containerised app as a Deployment with three replicas, perform a rolling update, then roll it back after a deliberately broken release.',
      },
    },
    {
      title: 'Networking',
      level: 'intermediate',
      description: 'How traffic reaches pods inside and outside the cluster.',
      topics: [
        ['Services', 3, 'ClusterIP, NodePort, and LoadBalancer types for stable access to changing pods.', 'https://kubernetes.io/docs/concepts/services-networking/service/'],
        ['Cluster DNS', 1, 'How CoreDNS resolves service names across namespaces.'],
        ['Ingress controllers', 3, 'Route HTTP traffic by host and path through NGINX, Traefik, or a cloud controller.', 'https://kubernetes.io/docs/concepts/services-networking/ingress/'],
        ['Gateway API', 2, 'The newer, role-oriented successor to Ingress for traffic routing.', { kind: 'alternative', docs: 'https://gateway-api.sigs.k8s.io/' }],
        ['Network policies', 2, 'Restrict which pods may talk to each other at the network level.'],
        ['CNI plugins', 2, 'How Calico, Cilium, and Flannel implement the pod network.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Configuration & Storage',
      level: 'intermediate',
      description: 'Inject settings and keep data safe across restarts.',
      topics: [
        ['ConfigMaps', 1, 'Supply non-sensitive configuration as environment variables or mounted files.', 'https://kubernetes.io/docs/concepts/configuration/configmap/'],
        ['Secrets', 2, 'Store credentials, understand base64 is not encryption, and enable encryption at rest.'],
        ['Persistent volumes & claims', 3, 'Decouple storage requests from the underlying disks that fulfil them.', 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/'],
        ['Storage classes', 1, 'Provision volumes dynamically with different performance tiers.'],
        ['External secret managers', 2, 'Sync secrets from Vault or cloud secret stores into the cluster.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Scheduling & Reliability',
      level: 'intermediate',
      description: 'Place pods sensibly and keep them healthy.',
      topics: [
        ['Requests & limits', 2, 'Reserve and cap CPU and memory, and understand QoS classes.'],
        ['Liveness, readiness & startup probes', 2, 'Tell Kubernetes when to restart a container and when to send it traffic.'],
        ['Affinity, taints & tolerations', 2, 'Steer pods toward or away from particular nodes and from each other.'],
        ['Autoscaling', 3, 'Scale pods with the HPA and nodes with Cluster Autoscaler or Karpenter.', 'https://kubernetes.io/docs/concepts/workloads/autoscaling/'],
        ['Pod disruption budgets', 1, 'Keep enough replicas available during node drains and upgrades.'],
      ],
    },
    {
      title: 'Packaging & Delivery',
      level: 'intermediate',
      description: 'Reusable manifests and automated deployments.',
      topics: [
        ['Helm', 4, 'Template, version, and share applications as charts.', 'https://helm.sh/docs/'],
        ['Kustomize', 2, 'Patch plain YAML per environment without a templating language.', { kind: 'alternative', docs: 'https://kustomize.io/' }],
        ['GitOps with Argo CD', 3, 'Continuously reconcile cluster state from a Git repository.', 'https://argo-cd.readthedocs.io/'],
        ['Flux', 3, 'A CNCF GitOps toolkit with a controller-per-concern design.', { kind: 'alternative' }],
        ['Progressive delivery', 2, 'Automate canary and blue-green releases with Argo Rollouts or Flagger.', { kind: 'optional' }],
      ],
      project: {
        title: 'GitOps-managed microservices',
        description: 'Package two services and a database as Helm charts, wire them to Argo CD, and promote a change from staging to production purely through Git commits.',
      },
    },
    {
      title: 'Security',
      level: 'advanced',
      description: 'Lock down access, workloads, and the supply chain.',
      topics: [
        ['RBAC', 3, 'Roles, bindings, and service accounts that grant least-privilege API access.', 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/'],
        ['Pod Security Standards', 2, 'Enforce baseline or restricted profiles with Pod Security Admission.'],
        ['Policy engines', 2, 'Write admission rules with Kyverno or OPA Gatekeeper.'],
        ['Image & supply-chain security', 2, 'Admit only signed, scanned images from trusted registries.'],
        ['Runtime threat detection', 2, 'Spot suspicious behaviour in running containers with tools such as Falco.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Observability & Operations',
      level: 'advanced',
      description: 'Understand what the cluster is doing and keep it current.',
      topics: [
        ['Metrics with Prometheus', 3, 'Scrape cluster and application metrics and visualise them in Grafana.', 'https://prometheus.io/docs/'],
        ['Centralised logging', 2, 'Collect pod logs with Fluent Bit or Promtail into a searchable store.'],
        ['Troubleshooting workloads', 3, 'Diagnose CrashLoopBackOff, pending pods, and failing probes systematically.'],
        ['Cluster upgrades', 2, 'Plan version skew, drain nodes, and upgrade the control plane safely.'],
        ['Backup & disaster recovery', 2, 'Back up etcd and resources with Velero and rehearse restores.'],
      ],
    },
    {
      title: 'Extending Kubernetes',
      level: 'advanced',
      description: 'Teach the API new tricks and run it in the cloud.',
      topics: [
        ['Custom resources', 2, 'Define your own object types with CustomResourceDefinitions.', 'https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/'],
        ['Operators', 4, 'Encode operational knowledge in controllers using Kubebuilder or Operator SDK.'],
        ['Managed Kubernetes', 3, 'Trade-offs of EKS, GKE, and AKS versus running your own control plane.'],
        ['Service mesh', 3, 'Add mTLS, retries, and traffic shaping with Istio or Linkerd.', { kind: 'optional' }],
      ],
      project: {
        title: 'Write a simple operator',
        description: 'Create a CRD and a controller that provisions and cleans up a Deployment, Service, and ConfigMap whenever a custom resource is created or deleted.',
      },
    },
  ],
})
