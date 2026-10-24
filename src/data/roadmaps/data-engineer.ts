import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'data-engineer',
  title: 'Data Engineer',
  short: 'Design pipelines that move and shape data reliably.',
  description:
    'Learn to collect, store, transform, and serve data so analysts and applications can depend on it. Covers modelling, batch and streaming processing, orchestration, and data quality.',
  category: 'role',
  accent: '#8b5cf6',
  tags: ['data', 'pipelines', 'cloud'],
  query: 'data engineering',
  sections: [
    {
      title: 'Core Programming',
      level: 'beginner',
      description: 'The languages and tools you will use every day.',
      topics: [
        ['Python for data work', 8, 'Scripts, packaging, typing, and working with files, APIs, and JSON.', 'https://docs.python.org/3/'],
        ['Advanced SQL', 8, 'Window functions, CTEs, aggregations, and reading query plans.'],
        ['Linux & shell', 4, 'Navigate servers, chain commands, and schedule simple jobs with cron.'],
        ['Git & collaboration', 2, 'Branching, pull requests, and reviewing pipeline code like application code.'],
        ['Scala or Java', 10, 'JVM languages common in Spark and Kafka codebases.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Databases & Storage',
      level: 'beginner',
      description: 'Where data lives and how it is laid out.',
      topics: [
        ['Relational databases', 4, 'Transactions, indexes, and normalisation in PostgreSQL or MySQL.', 'https://www.postgresql.org/docs/'],
        ['NoSQL stores', 3, 'Document, key-value, and wide-column databases and when to reach for them.'],
        ['OLTP vs OLAP', 2, 'Why transactional and analytical workloads need different designs.'],
        ['File formats', 3, 'CSV, JSON, Avro, Parquet, and why columnar formats speed up analytics.', 'https://parquet.apache.org/docs/'],
        ['Object storage', 2, 'Use S3, GCS, or Azure Blob as cheap, durable foundations for a data lake.'],
      ],
    },
    {
      title: 'Data Modelling & Warehousing',
      level: 'intermediate',
      description: 'Shape data so it answers questions quickly.',
      topics: [
        ['Dimensional modelling', 4, 'Facts, dimensions, star schemas, and slowly changing dimensions.'],
        ['Cloud data warehouses', 5, 'Load and query data in Snowflake, BigQuery, or Redshift.'],
        ['Lakehouse table formats', 4, 'Add ACID tables to object storage with Delta Lake, Iceberg, or Hudi.', 'https://iceberg.apache.org/docs/latest/'],
        ['Partitioning & clustering', 2, 'Organise large tables so queries scan only what they need.'],
        ['Data vault', 3, 'An auditable, insert-only modelling style for complex enterprises.', { kind: 'alternative' }],
      ],
    },
    {
      title: 'Batch Processing',
      level: 'intermediate',
      description: 'Transform large datasets on a schedule.',
      topics: [
        ['ETL vs ELT', 2, 'Decide whether to transform before loading or inside the warehouse.'],
        ['Apache Spark', 8, 'DataFrames, lazy evaluation, partitions, and tuning shuffles.', 'https://spark.apache.org/docs/latest/'],
        ['dbt', 5, 'Version-controlled SQL transformations with tests and documentation.', 'https://docs.getdbt.com/'],
        ['Polars & DuckDB', 3, 'Fast single-machine engines that often replace a cluster for medium data.', { kind: 'alternative' }],
        ['Incremental loads', 2, 'Process only new or changed records with watermarks and merge statements.'],
      ],
      project: {
        title: 'Batch ELT warehouse',
        description: 'Ingest a public dataset into object storage, load it into a warehouse, and model it into a tested star schema with dbt that powers a small dashboard.',
      },
    },
    {
      title: 'Orchestration',
      level: 'intermediate',
      description: 'Schedule, retry, and monitor pipelines.',
      topics: [
        ['Apache Airflow', 6, 'DAGs, operators, scheduling, retries, and backfills.', 'https://airflow.apache.org/docs/'],
        ['Dagster', 4, 'Asset-centric orchestration with strong typing and lineage.', { kind: 'alternative', docs: 'https://docs.dagster.io/' }],
        ['Prefect', 3, 'Python-native workflows with minimal boilerplate.', { kind: 'alternative' }],
        ['Idempotent pipeline design', 2, 'Make reruns safe so failures can be retried without duplicating data.'],
        ['Data ingestion tools', 3, 'Replicate SaaS and database sources with Airbyte, Fivetran, or custom connectors.'],
      ],
    },
    {
      title: 'Streaming',
      level: 'advanced',
      description: 'Process events as they happen.',
      topics: [
        ['Event streaming concepts', 2, 'Topics, partitions, offsets, ordering, and delivery guarantees.'],
        ['Apache Kafka', 6, 'Producers, consumers, consumer groups, and schema management.', 'https://kafka.apache.org/documentation/'],
        ['Stream processing engines', 6, 'Windowing, state, and watermarks with Flink or Spark Structured Streaming.'],
        ['Change data capture', 3, 'Stream database changes in real time with Debezium.'],
        ['Managed streaming services', 2, 'Kinesis, Pub/Sub, and Event Hubs as hosted alternatives to Kafka.', { kind: 'alternative' }],
      ],
      project: {
        title: 'Real-time event pipeline',
        description: 'Capture changes from a Postgres database with CDC, push them through Kafka, aggregate them in a streaming job, and land results in a queryable table within seconds.',
      },
    },
    {
      title: 'Data Quality & Governance',
      level: 'advanced',
      description: 'Make data trustworthy and discoverable.',
      topics: [
        ['Data testing', 3, 'Validate freshness, nulls, uniqueness, and ranges with dbt tests or Great Expectations.'],
        ['Data contracts', 2, 'Agree schemas and guarantees with upstream producers before things break.'],
        ['Lineage & catalogs', 3, 'Track where data comes from and make it searchable with DataHub or OpenMetadata.'],
        ['Access control & privacy', 3, 'Role-based permissions, column masking, and handling personal data lawfully.'],
        ['Data observability', 2, 'Detect anomalies in volume, schema, and distribution automatically.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Cloud & Infrastructure',
      level: 'advanced',
      description: 'Run data platforms efficiently in the cloud.',
      topics: [
        ['Cloud data services', 5, 'Map the data offerings of AWS, GCP, or Azure to your architecture.'],
        ['Infrastructure as code for data', 3, 'Provision buckets, warehouses, and permissions with Terraform.'],
        ['Containers for pipelines', 3, 'Package jobs in Docker and run them on Kubernetes or serverless runtimes.'],
        ['Cost optimisation', 2, 'Control spend with right-sized compute, storage tiers, and query hygiene.'],
        ['CI/CD for data', 2, 'Test and deploy pipeline changes automatically with isolated environments.'],
      ],
      project: {
        title: 'Production data platform',
        description: 'Provision a small lakehouse with Terraform, orchestrate ingestion and transformation with Airflow, add quality checks and alerting, and document the platform for its users.',
      },
    },
  ],
})
