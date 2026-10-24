import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'docker',
  title: 'Docker',
  short: 'Package and run software in portable containers.',
  description:
    'Go from your first container to lean, secure images and repeatable multi-service setups. Covers the tooling, networking, storage, and habits that make containers dependable in real projects.',
  category: 'skill',
  accent: '#2496ed',
  tags: ['containers', 'devops', 'tooling'],
  query: 'docker',
  sections: [
    {
      title: 'Container Foundations',
      level: 'beginner',
      description: 'Why containers exist and what is really happening underneath.',
      topics: [
        ['Containers vs virtual machines', 2, 'Compare shared-kernel isolation with full hardware virtualisation and the trade-offs of each.'],
        ['Linux namespaces & cgroups', 3, 'The kernel features that give a container its own view of processes and its resource limits.', { kind: 'optional' }],
        ['Installing Docker', 1, 'Set up Docker Engine or Docker Desktop and confirm the daemon is reachable.', 'https://docs.docker.com/get-started/get-docker/'],
        ['Docker architecture', 2, 'How the CLI, daemon, containerd, and registries cooperate when you run a command.'],
        ['OCI image & runtime specs', 1, 'The open standards that let images and runtimes from different vendors interoperate.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Working with Containers',
      level: 'beginner',
      description: 'Everyday commands for starting, inspecting, and cleaning up.',
      topics: [
        ['Running containers', 3, 'Start containers interactively or detached, map ports, and pass environment variables.', 'https://docs.docker.com/reference/cli/docker/container/run/'],
        ['Container lifecycle', 2, 'Create, start, stop, restart, and remove containers, plus restart policies.'],
        ['Logs & exec', 2, 'Read output streams and open a shell inside a running container to debug it.'],
        ['Inspecting resources', 1, 'Use inspect, stats, and top to see configuration and live resource usage.'],
        ['Pruning & disk hygiene', 1, 'Reclaim space from dangling images, stopped containers, and unused volumes.'],
      ],
    },
    {
      title: 'Building Images',
      level: 'beginner',
      description: 'Turn your code into a reproducible image.',
      topics: [
        ['Dockerfile instructions', 4, 'FROM, RUN, COPY, CMD, ENTRYPOINT, and how each one shapes the final image.', 'https://docs.docker.com/reference/dockerfile/'],
        ['Layers & build cache', 2, 'Order instructions so unchanged steps are reused and rebuilds stay fast.'],
        ['.dockerignore', 1, 'Keep secrets, build output, and bulky folders out of the build context.'],
        ['Tagging & versioning', 1, 'Meaningful tags, immutable digests, and why relying on latest causes surprises.'],
        ['Choosing base images', 2, 'Weigh full distros, slim variants, Alpine, and distroless images against your needs.'],
      ],
      project: {
        title: 'Containerise a personal app',
        description: 'Write a Dockerfile for an existing web app, build it, run it locally with a mapped port, and document the commands in a README.',
      },
    },
    {
      title: 'Storage & Networking',
      level: 'intermediate',
      description: 'Persist data and let containers find each other.',
      topics: [
        ['Volumes', 2, 'Docker-managed storage that outlives the container that created it.', 'https://docs.docker.com/engine/storage/volumes/'],
        ['Bind mounts', 1, 'Map host directories into containers for live-reload development workflows.'],
        ['tmpfs mounts', 1, 'Memory-backed scratch space for sensitive or throwaway data.', { kind: 'optional' }],
        ['Bridge networks', 2, 'User-defined networks with built-in DNS so containers reach each other by name.', 'https://docs.docker.com/engine/network/'],
        ['Host & none networking', 1, 'When to drop network isolation entirely, or remove networking altogether.'],
        ['Port publishing', 1, 'Expose container ports on the host and avoid accidentally binding to every interface.'],
      ],
    },
    {
      title: 'Docker Compose',
      level: 'intermediate',
      description: 'Describe a whole stack in one file.',
      topics: [
        ['Compose file structure', 3, 'Define services, networks, and volumes declaratively in compose.yaml.', 'https://docs.docker.com/compose/'],
        ['Service dependencies & health checks', 2, 'Start services in order and wait until dependencies actually report healthy.'],
        ['Environment & config files', 1, 'Manage settings with .env files, variable interpolation, and overrides.'],
        ['Profiles & multiple files', 1, 'Toggle optional services and layer dev, test, and prod configurations.'],
        ['Compose Watch', 1, 'Sync code changes into running services automatically while you develop.', { kind: 'optional' }],
      ],
      project: {
        title: 'Multi-service dev environment',
        description: 'Compose a frontend, API, database, and cache with health checks, named volumes, and a single command to bring the stack up or down.',
      },
    },
    {
      title: 'Advanced Image Building',
      level: 'intermediate',
      description: 'Smaller, faster, and portable builds.',
      topics: [
        ['Multi-stage builds', 3, 'Compile in one stage and ship only the runtime artifacts in a slim final image.', 'https://docs.docker.com/build/building/multi-stage/'],
        ['BuildKit features', 2, 'Cache mounts, secret mounts, and parallel stages for quicker, safer builds.'],
        ['Multi-platform images', 2, 'Use buildx to produce images for both amd64 and arm64 from one build.'],
        ['Build arguments & targets', 1, 'Parameterise builds and pick a specific stage for testing or debugging.'],
        ['Buildpacks', 2, 'Generate images from source without writing a Dockerfile.', { kind: 'alternative' }],
      ],
    },
    {
      title: 'Registries & Distribution',
      level: 'intermediate',
      description: 'Share images with your team and your pipelines.',
      topics: [
        ['Docker Hub', 1, 'Publish public or private repositories and understand pull rate limits.', 'https://docs.docker.com/docker-hub/'],
        ['Cloud registries', 2, 'Push to ECR, Artifact Registry, ACR, or GitHub Container Registry with proper auth.'],
        ['Self-hosted registries', 2, 'Run your own registry with Harbor or the open-source distribution server.', { kind: 'optional' }],
        ['Building images in CI', 3, 'Automate build, tag, and push steps with layer caching inside a pipeline.'],
      ],
    },
    {
      title: 'Security',
      level: 'advanced',
      description: 'Shrink the attack surface of every image and container.',
      topics: [
        ['Running as non-root', 1, 'Create a dedicated user and drop root privileges inside the image.'],
        ['Image vulnerability scanning', 2, 'Find known CVEs with Docker Scout, Trivy, or Grype and act on the results.'],
        ['Secrets handling', 2, 'Keep credentials out of layers and environment variables using build and runtime secrets.'],
        ['Capabilities & read-only filesystems', 2, 'Drop Linux capabilities, enable read-only root, and apply seccomp profiles.'],
        ['Rootless mode', 2, 'Run the Docker daemon itself without root privileges.', { kind: 'optional', docs: 'https://docs.docker.com/engine/security/rootless/' }],
        ['Image signing & provenance', 2, 'Sign images and attach SBOMs so consumers can verify where they came from.'],
      ],
      project: {
        title: 'Harden a production image',
        description: 'Take an existing image, cut its size by at least half, run it as non-root with a read-only filesystem, and clear all critical scanner findings.',
      },
    },
    {
      title: 'Beyond a Single Host',
      level: 'advanced',
      description: 'Where containers go once one machine is not enough.',
      topics: [
        ['Resource limits', 1, 'Cap CPU and memory so one noisy container cannot starve its neighbours.'],
        ['Logging drivers', 1, 'Ship container logs to files, syslog, or external aggregators.'],
        ['Docker Swarm', 3, 'Docker\'s built-in clustering for simple multi-node service deployments.', { kind: 'alternative' }],
        ['Podman', 2, 'A daemonless, Docker-compatible engine favoured on some Linux distributions.', { kind: 'alternative', docs: 'https://docs.podman.io/' }],
        ['Moving to Kubernetes', 2, 'How container concepts map onto pods, deployments, and services in an orchestrator.'],
      ],
    },
  ],
})
