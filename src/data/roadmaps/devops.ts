import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'devops',
  title: 'DevOps Engineer',
  short: 'Automate, deploy, and keep systems healthy.',
  description:
    'Learn the operating systems, automation, containers, cloud, and observability skills that let teams ship quickly and safely.',
  category: 'role',
  accent: '#3b82f6',
  tags: ['cloud', 'automation', 'infrastructure'],
  query: 'devops',
  sections: [
    {
      title: 'Operating Systems',
      level: 'beginner',
      description: 'Linux is home.',
      topics: [
        ['Linux command line', 6, 'Files, pipes, redirection, text processing with grep, sed, and awk.'],
        ['Processes & services', 3, 'systemd, signals, and managing long-running services.'],
        ['Users & permissions', 2, 'Ownership, chmod, sudo, and the principle of least privilege.'],
        ['Package management', 1, 'apt, dnf, and keeping systems patched.'],
      ],
    },
    {
      title: 'Scripting',
      level: 'beginner',
      description: 'Automate the boring parts.',
      topics: [
        ['Bash scripting', 5, 'Variables, loops, conditionals, and robust error handling with set -euo pipefail.'],
        ['Python for automation', 6, 'Glue scripts, API calls, and file processing.'],
        ['Go for tooling', 8, 'Build fast single-binary CLIs.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Networking',
      level: 'beginner',
      description: 'How machines talk.',
      topics: [
        ['OSI & TCP/IP models', 3, 'Layers, ports, and where common protocols live.'],
        ['DNS, DHCP & subnets', 3, 'Name resolution, IP allocation, and CIDR notation.'],
        ['Load balancers & reverse proxies', 3, 'Nginx, HAProxy, and layer 4 vs layer 7 balancing.'],
        ['TLS & certificates', 2, 'How HTTPS works and automating certificates with ACME.'],
        ['Firewalls & VPNs', 2, 'Security groups, iptables, and private connectivity.'],
      ],
    },
    {
      title: 'Containers',
      level: 'intermediate',
      description: 'Package once, run anywhere.',
      topics: [
        ['Docker fundamentals', 5, 'Images, containers, volumes, and networks.', 'https://docs.docker.com/get-started/'],
        ['Writing good Dockerfiles', 3, 'Multi-stage builds, layer caching, and minimal base images.'],
        ['Docker Compose', 2, 'Run multi-container environments locally.'],
        ['Container registries', 1, 'Push, tag, and scan images.'],
      ],
      project: { title: 'Containerise a 3-tier app', description: 'Run a web app, API, and database with Compose, health checks, and persistent volumes.' },
    },
    {
      title: 'CI/CD',
      level: 'intermediate',
      description: 'Every commit, tested and shippable.',
      topics: [
        ['GitHub Actions', 4, 'Workflows, jobs, caching, and reusable actions.', 'https://docs.github.com/en/actions'],
        ['GitLab CI / Jenkins', 4, 'Other widely used pipeline engines.', { kind: 'alternative' }],
        ['Deployment strategies', 3, 'Rolling, blue-green, and canary releases.'],
        ['Artifact & secret management', 2, 'Store build outputs and credentials securely.'],
      ],
    },
    {
      title: 'Infrastructure as Code',
      level: 'intermediate',
      description: 'Infrastructure you can review and version.',
      topics: [
        ['Terraform / OpenTofu', 8, 'Declarative cloud resources, state, modules, and plans.', 'https://developer.hashicorp.com/terraform/docs'],
        ['Ansible', 5, 'Agentless configuration management with playbooks.'],
        ['Pulumi', 5, 'Infrastructure defined in general-purpose languages.', { kind: 'alternative' }],
        ['GitOps', 3, 'Use Git as the source of truth with Argo CD or Flux.'],
      ],
    },
    {
      title: 'Cloud Providers',
      level: 'intermediate',
      description: 'Learn one cloud deeply.',
      topics: [
        ['AWS core services', 15, 'EC2, S3, VPC, IAM, RDS, and Lambda.', 'https://docs.aws.amazon.com/'],
        ['Google Cloud', 15, 'Compute Engine, GKE, Cloud Run, and BigQuery.', { kind: 'alternative' }],
        ['Azure', 15, 'VMs, AKS, App Service, and Entra ID.', { kind: 'alternative' }],
        ['Cost management', 3, 'Tagging, budgets, rightsizing, and reserved capacity.'],
      ],
    },
    {
      title: 'Orchestration',
      level: 'advanced',
      description: 'Run containers at scale.',
      topics: [
        ['Kubernetes core objects', 10, 'Pods, Deployments, Services, ConfigMaps, and Secrets.', 'https://kubernetes.io/docs/home/'],
        ['Helm & Kustomize', 4, 'Package and customise Kubernetes manifests.'],
        ['Ingress & service mesh', 4, 'Route external traffic and manage service-to-service communication.'],
        ['Autoscaling', 3, 'Horizontal pod autoscaling and cluster autoscaling.'],
      ],
    },
    {
      title: 'Observability & Reliability',
      level: 'advanced',
      description: 'Know when things break — before users do.',
      topics: [
        ['Metrics with Prometheus', 4, 'Instrumentation, PromQL, and alert rules.', 'https://prometheus.io/docs/'],
        ['Dashboards with Grafana', 2, 'Visualise system health for your team.'],
        ['Centralised logging', 3, 'Loki, ELK, or a managed alternative.'],
        ['SLOs & error budgets', 3, 'Define reliability targets that guide decisions.'],
        ['Incident response', 3, 'On-call, runbooks, and blameless postmortems.'],
      ],
      project: { title: 'Production-ready cluster', description: 'Provision a Kubernetes cluster with Terraform, deploy via GitOps, and alert on SLO burn.' },
    },
    {
      title: 'DevSecOps',
      level: 'advanced',
      description: 'Security built into the pipeline.',
      topics: [
        ['Dependency & image scanning', 2, 'Catch known vulnerabilities before deploying.'],
        ['Secrets management', 3, 'Vault, cloud secret managers, and rotation.'],
        ['Policy as code', 3, 'Enforce rules with OPA or Kyverno.', { kind: 'optional' }],
        ['Supply-chain integrity', 2, 'Signed artifacts and SBOMs.'],
      ],
    },
  ],
})
