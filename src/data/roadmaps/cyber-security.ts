import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'cyber-security',
  title: 'Cyber Security',
  short: 'Defend systems, networks, and people.',
  description: 'Build the networking, systems, and defensive security skills needed for SOC analyst and security engineering roles.',
  category: 'role',
  accent: '#22c55e',
  tags: ['security', 'networking'],
  query: 'cyber security',
  sections: [
    {
      title: 'IT Foundations',
      level: 'beginner',
      description: 'Know what you are protecting.',
      topics: [
        ['Computer hardware & OS', 4, 'How operating systems manage processes, memory, and storage.'],
        ['Networking essentials', 6, 'TCP/IP, ports, routing, and common protocols.'],
        ['Linux & Windows administration', 8, 'Users, services, logs, and the command line on both.'],
      ],
    },
    {
      title: 'Security Concepts',
      level: 'beginner',
      description: 'Core principles.',
      topics: [
        ['CIA triad', 1, 'Confidentiality, integrity, and availability.'],
        ['Authentication & access control', 3, 'MFA, least privilege, and identity management.'],
        ['Cryptography basics', 4, 'Hashing, symmetric and asymmetric encryption, and PKI.'],
        ['Threats & attack types', 3, 'Phishing, malware, ransomware, and social engineering.'],
      ],
    },
    {
      title: 'Defensive Operations',
      level: 'intermediate',
      description: 'Blue team work.',
      topics: [
        ['SIEM & log analysis', 6, 'Collect and correlate events to spot attacks.'],
        ['Endpoint protection', 3, 'EDR tools and hardening baselines.'],
        ['Network monitoring', 4, 'Packet capture with Wireshark and IDS alerts.'],
        ['Incident response', 5, 'Preparation, containment, eradication, and recovery.'],
      ],
      project: { title: 'Home SOC lab', description: 'Set up a virtual lab with a SIEM, generate attack traffic, and write detection rules.' },
    },
    {
      title: 'Offensive Awareness',
      level: 'advanced',
      description: 'Understand attackers (in authorised labs only).',
      topics: [
        ['Vulnerability scanning', 3, 'Find and prioritise weaknesses.'],
        ['Web application security', 5, 'OWASP Top 10 in practice.'],
        ['Penetration testing methodology', 5, 'Scoping, reconnaissance, and reporting.', { kind: 'optional' }],
        ['CTF practice', 10, 'Sharpen skills on legal capture-the-flag platforms.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Cloud & Governance',
      level: 'advanced',
      description: 'Security at organisational scale.',
      topics: [
        ['Cloud security', 5, 'IAM, misconfigurations, and shared responsibility.'],
        ['Risk management & frameworks', 3, 'NIST CSF, ISO 27001, and risk registers.'],
        ['Compliance', 2, 'GDPR, SOC 2, and audit readiness.'],
      ],
    },
  ],
})
