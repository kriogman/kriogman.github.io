// i18n.js — EN/ES language switcher for static portfolio
(function () {
  'use strict';

  var TRANSLATIONS = {
    en: {
      nav: {
        home: 'Home',
        mindset: 'Mindset',
        resume: 'Resume',
        skills: 'Skills & Tech',
        studies: 'Studies'
      },
      hero: {
        name: "Hi there, I'm Javier.",
        tagline: "Building reliable, scalable infrastructure for fast-moving teams — so shipping is the default and ops is never the bottleneck."
      },
      about: {
        roles: 'DevOps Engineer, Site Reliability Engineer, Cloud Engineer',
        iam_prefix: 'I Am a ',
        body: 'Over a decade designing, building, and operating cloud-native platforms. I work at the intersection of infrastructure, reliability, and developer experience — the systems and pipelines that let product teams ship fast without breaking things.',
        details: {
          title: 'Personal Details',
          languages_label: 'Languages: ',
          languages_value: 'Spanish, English',
          nationality_label: 'Nationality: ',
          nationality_value: 'Spanish'
        }
      },
      mindset: {
        title: 'The mindset.',
        subtitle: 'Good engineering is as much about how you think as what you ship. These are the principles that guide how I approach reliability, delivery, and collaboration.',
        card1: {
          title: 'Automate to eliminate toil',
          body: "Manual, repetitive work compounds quietly until it owns your week. Every process that can be codified should be — provisioning, testing, deployment, remediation. The goal of automation isn't efficiency. It's preserving engineering judgment for problems that actually require it."
        },
        card2: {
          title: 'Deployment frequency is a health metric',
          body: "How often a team deploys tells you more about its culture than any post-mortem. Small, frequent releases compress feedback loops, reduce blast radius, and make rollbacks trivial. CI/CD isn't a tooling choice — it's a signal that a team owns what it ships end to end."
        },
        card3: {
          title: 'The desired state lives in Git',
          body: "Infrastructure defined as code is infrastructure you can review, reproduce, and audit. GitOps extends this further: the system converges to what's in the repository, not to what someone ran last Tuesday. Version control becomes the change log; pull requests become the approval process."
        },
        card4: {
          title: 'You build it, you run it',
          body: "The handoff between development and operations is where accountability goes to die. When the team that ships is also the team on-call, the incentives align. DevOps isn't a set of tools — it's the decision to own the full lifecycle of what you build."
        },
        card5: {
          title: 'Failure is data, not shame',
          body: 'Distributed systems fail. The question is what you learn. Error budgets make the reliability contract explicit — a formal agreement between velocity and stability. Blameless postmortems turn incidents into institutional memory. Every failure should make the next one cheaper.'
        },
        card6: {
          title: "You can't improve what you don't observe",
          body: "Monitoring tells you something is broken. Observability tells you why. SLIs and SLOs aren't dashboard metrics — they're commitments. DORA metrics measure whether delivery is actually improving over time. Without data, improvement is just opinion."
        }
      },
      resume: {
        title: 'Work Experience',
        subtitle: 'These are the roles and tasks that I have performed in my years of experience.',
        quadrant: { desc: 'Full IaC with Terraform, GitOps via ArgoCD, and centralized CI/CD pipelines on GitLab. Every environment declarative, every deployment automated, every secret out of Git.' },
        '2gether': { desc: 'Embedded SRE at a regulated challenger bank offering crypto and fiat financial services. Owned the cloud infrastructure, observability stack, and CI/CD pipelines — keeping real-time financial operations stable while continuously driving down infrastructure costs.' },
        yogabot: { desc: 'R&D engagement exploring blockchain architecture and tokenomics to support a decentralized wellness ecosystem.' },
        personal: { desc: 'Completed a long-pending university degree while deepening knowledge in investments, financial markets, and distributed ledger technologies.' },
        fintonic: { desc: 'DevOps/SRE at a personal finance platform operating across Spain and Latin America. Contributed to a three-year infrastructure overhaul — migrating from IaaS to Kubernetes, building CI/CD pipelines and IaC tooling, and wiring up observability across the full stack. Production stayed up throughout.' },
        kimia: { desc: 'First IT role, at a global digital advertising company. Provisioned and managed bare metal Linux servers and AWS cloud infrastructure, built CI/CD pipelines, and wired up monitoring across the platform. The foundation that everything else was built on.' }
      },
      skills: {
        title: 'Work Expertise',
        subtitle: "Tools and technologies I've used in production — across cloud, containers, pipelines, and observability."
      },
      studies: {
        title: 'i am a former student at...',
        uc3m: { degree: 'Degree in Telematics Engineering' },
        cujae: { degree: 'Telecommunications and Electronics Engineering' },
        fdp: {
          label: 'Final Degree Project',
          title: 'Zigbee Gateway for IoT Environment',
          body: 'End-to-end IoT architecture connecting Zigbee sensors to AWS via MQTT — built on Raspberry Pi with Node-RED and Zigbee2MQTT.',
          cta: 'View Project'
        }
      },
      contact: {
        title: "Let's Build Something Together.",
        body: "Got a platform to build, a reliability problem to solve, or just want to talk engineering? I'm all ears."
      },
      page_2gether: {
        hero: 'Site Reliability Engineer @ ',
        intro: '2gether was a challenger bank offering cryptocurrency and fiat financial services. As part of the SRE team, I maintained the reliability and scalability of a multi-service AWS infrastructure supporting real-time financial operations for a growing user base.',
        role_title: 'My Role & Responsibilities',
        li1: 'Managed multi-environment AWS infrastructure across development, staging, and production',
        li2: 'Operated and scaled EKS clusters running containerized microservices',
        li3: 'Administered PostgreSQL databases on RDS and DynamoDB for non-relational workloads',
        li4: 'Configured and maintained messaging brokers: RabbitMQ (Amazon MQ) and Kafka (MSK)',
        li5: 'Built monitoring dashboards and business and technical alerts in Datadog',
        li6: 'Maintained CI/CD pipelines in Jenkins across multiple microservices',
        li7: 'Managed infrastructure as code, versioned in Git repositories',
        li8: 'Identified and executed optimizations that reduced operational costs',
        stack_title: 'Tech Stack',
        outcomes_title: 'Key Outcomes',
        outcomes: 'Maintained high platform availability for a regulated financial product while continuously improving infrastructure reliability and reducing cloud spend through systematic optimization.'
      },
      page_fintonic: {
        hero: 'DevOps Engineer @ ',
        intro: 'Fintonic is a personal finance management platform operating across Spain and Latin America. As part of the DevOps/SRE team, I contributed to modernizing the infrastructure — evolving from a Chef-managed IaaS model on AWS toward a more reliable, maintainable, highly available, and scalable platform based on Kubernetes, while keeping production running throughout the transition.',
        role_title: 'My Role & Responsibilities',
        li1: 'Contributed to migrating the platform from an IaaS model (AWS + Chef) to a Kubernetes-based PaaS architecture — including maintaining and improving the existing infrastructure during the transition',
        li2: 'Helped implement a CI/CD system using GitLab, GitLab CI, and Docker, improving deployment automation across engineering teams',
        li3: 'Managed infrastructure as code using Terraform, Ansible, and Packer — versioned in Git',
        li4: 'Set up monitoring, observability, and alerting across the platform using Datadog, Sentry, and the ELK stack (Elasticsearch, Logstash, Kibana)',
        li5: 'Administered and maintained production databases: MongoDB, MySQL, and RDS on AWS',
        li6: 'Administered and maintained RabbitMQ message brokers for event-driven microservice communication',
        stack_title: 'Tech Stack',
        outcomes_title: 'Key Outcomes',
        outcomes: 'Participated in a full platform evolution from IaaS to Kubernetes over three years, contributing to improved deployment frequency, environment consistency, and operational visibility across the stack.'
      },
      page_kimia: {
        hero: 'Junior Systems Architect @ ',
        intro: 'Kimia is a global digital advertising and performance marketing company. As a Junior Systems Architect within the Operations team, I managed and evolved the infrastructure supporting the business platform — my first professional role in IT infrastructure.',
        role_title: 'My Role & Responsibilities',
        li1: 'Resolved incidents and maintained availability of the business platform',
        li2: 'Provisioned and managed bare metal servers running Debian, CentOS, and Ubuntu',
        li3: 'Automated server configuration and provisioning using Puppet and Foreman',
        li4: 'Managed log storage and application backup processes',
        li5: 'Administered MongoDB and MySQL production databases',
        li6: 'Developed and operated cloud infrastructure on AWS',
        li7: 'Built and maintained CI/CD pipelines using Jenkins and Ansible',
        li8: 'Monitored platform health using Nagios, CloudWatch, PagerDuty, and Munin',
        li9: 'Managed source code repositories on Bitbucket and SVN',
        li10: 'Administered DNS servers for the business domain',
        stack_title: 'Tech Stack',
        outcomes_title: 'Key Outcomes',
        outcomes: 'Built operational foundations in monitoring, configuration management, and cloud infrastructure for a global ad-tech platform, establishing hands-on experience across the full Linux sysadmin and DevOps toolchain.'
      },
      page_iot: {
        hero: 'Zigbee Gateway for IoT Environment',
        intro: 'Final degree project designing a Zigbee-based IoT gateway architecture for a smart home environment. The goal was to build a flexible, end-to-end system connecting battery-operated Zigbee sensors and actuators to a cloud-accessible monitoring and control interface — demonstrating how constrained wireless protocols can integrate with modern cloud infrastructure.',
        role_title: 'My Role & Responsibilities',
        li1: 'Designed the full system architecture, from the physical sensor network to cloud integration',
        li2: 'Flashed a CC2531 USB dongle with Zigbee HA coordinator firmware and connected it to a Raspberry Pi as the network coordinator',
        li3: 'Deployed Zigbee2MQTT as the protocol bridge between the Zigbee network and an MQTT message bus',
        li4: 'Configured Mosquitto as the MQTT broker and set up a bridge to AWS IoT Core for remote access',
        li5: 'Provisioned AWS infrastructure (EC2, IoT Core, IAM) for cloud-side processing and access control',
        li6: 'Built device logic flows and monitoring dashboards in Node-RED deployed on AWS EC2',
        li7: 'Integrated a wireless sensor and actuator network of five devices: humidity sensor, contact sensor, motion sensor, smart bulb, and switch',
        stack_title: 'Tech Stack',
        outcomes_title: 'Key Outcomes',
        outcomes: 'Delivered a fully functional smart home prototype with remote and secure cloud access, integrating low-power Zigbee devices with AWS through a complete IoT stack built from scratch.',
        doc_cta: "Project's Documentation",
        flow_cta: "Node-RED's flow"
      },
      page_quadrant: {
        hero: 'Site Reliability Engineer / DevOps Engineer @ ',
        intro: 'Quadrant Travel Technology is a Spanish travel-tech company that builds the digital backbone for independent travel agencies — an integrated ecosystem of booking, distribution, and analytics platforms with connections to 22+ industry partners including Amadeus, Expedia, Iberia, and Hotelbeds. As part of the SRE/DevOps team I designed and built the cloud infrastructure, deployment automation, and operational reliability platform from the ground up.',
        role_title: 'My Role & Responsibilities',
        li1: 'Architected and built the entire AWS infrastructure from scratch using Infrastructure as Code (Terraform + Terragrunt), covering VPC networking, EKS clusters, RDS Aurora, MSK, ElastiCache, IAM, KMS, S3, and Route53 across dev, qa, pre, and prod environments',
        li2: 'Designed and implemented a full GitOps platform with ArgoCD \u2014 168 Applications across 76 ApplicationSets covering 60+ containerized microservices',
        li3: 'Built centralized GitLab CI pipeline templates from zero: security scanning, multi-environment Docker builds, ECR pushes, and automated deployments',
        li4: 'Integrated HashiCorp Vault with ArgoCD (AVP plugin) for zero-secret-in-Git secret management across 200+ application secrets',
        li5: 'Configured node autoscaling with Karpenter (spot/on-demand mixed) and pod autoscaling with HPA, enforcing high availability with PodDisruptionBudgets',
        li6: 'Deployed and maintain the full observability stack: Prometheus, Grafana, Loki, Jaeger, OpenTelemetry, Elasticsearch',
        li7: 'Managed Aurora PostgreSQL v17 with read replicas and RDS Proxy for connection pooling in production',
        li8: 'Operated Apache Kafka (AWS MSK) for domain event streaming and Kong API Gateway for internal/external traffic routing',
        li9: 'Authored runbooks, incident response playbooks, and operational documentation for the engineering org',
        stack_title: 'Tech Stack',
        outcomes_title: 'Key Outcomes',
        outcomes: 'Designed and built from scratch a production-grade cloud platform on AWS supporting 60+ containerized microservices across four isolated environments, enabling continuous delivery for a travel technology suite used by independent agencies across Spain. Eliminated infrastructure drift through a fully declarative GitOps and IaC approach \u2014 every resource versioned, reviewed, and automatically reconciled. Achieved multi-AZ high availability via Karpenter node provisioning, HPA-driven pod scaling, and zero-downtime deployments enforced by PodDisruptionBudgets. Secured the entire secrets surface across 200+ application secrets with HashiCorp Vault \u2014 no credentials in Git, across any environment.'
      }
    },
    es: {
      nav: {
        home: 'Inicio',
        mindset: 'Mentalidad',
        resume: 'Experiencia',
        skills: 'Habilidades',
        studies: 'Estudios'
      },
      hero: {
        name: 'Hola, soy Javier.',
        tagline: 'Construyendo infraestructura fiable y escalable para equipos ágiles — para que desplegar sea la norma y las ops nunca sean el cuello de botella.'
      },
      about: {
        roles: 'Ingeniero DevOps, Ingeniero de Fiabilidad, Ingeniero Cloud',
        iam_prefix: 'Soy un ',
        body: 'Más de una década diseñando, construyendo y operando plataformas cloud-native. Trabajo en la intersección de infraestructura, fiabilidad y experiencia del desarrollador — los sistemas y pipelines que permiten a los equipos desplegar rápido sin romper nada.',
        details: {
          title: 'Datos Personales',
          languages_label: 'Idiomas: ',
          languages_value: 'Español, Inglés',
          nationality_label: 'Nacionalidad: ',
          nationality_value: 'Español'
        }
      },
      mindset: {
        title: 'La mentalidad.',
        subtitle: 'La buena ingeniería depende tanto de cómo piensas como de lo que construyes. Estos son los principios que guían mi forma de abordar la fiabilidad, la entrega y la colaboración.',
        card1: {
          title: 'Automatiza para eliminar el trabajo repetitivo',
          body: 'El trabajo manual y repetitivo se acumula en silencio hasta apoderarse de tu semana. Todo proceso que pueda codificarse debe serlo — aprovisionamiento, testing, despliegue, remediación. El objetivo de la automatización no es la eficiencia. Es preservar el criterio de ingeniería para los problemas que realmente lo requieren.'
        },
        card2: {
          title: 'La frecuencia de despliegue es un indicador de salud',
          body: 'La frecuencia con la que un equipo despliega revela más sobre su cultura que cualquier post-mortem. Las releases pequeñas y frecuentes comprimen los ciclos de feedback, reducen el radio de impacto y hacen los rollbacks triviales. El CI/CD no es una decisión de herramientas — es la señal de que un equipo es dueño de lo que construye de principio a fin.'
        },
        card3: {
          title: 'El estado deseado vive en Git',
          body: 'La infraestructura definida como código es infraestructura que puedes revisar, reproducir y auditar. GitOps va más allá: el sistema converge hacia lo que está en el repositorio, no hacia lo que alguien ejecutó el martes pasado. El control de versiones se convierte en el registro de cambios; los pull requests, en el proceso de aprobación.'
        },
        card4: {
          title: 'Lo construyes, lo operas',
          body: 'El traspaso entre desarrollo y operaciones es donde muere la responsabilidad. Cuando el equipo que despliega también es el equipo de guardia, los incentivos se alinean. DevOps no es un conjunto de herramientas — es la decisión de ser dueño del ciclo de vida completo de lo que construyes.'
        },
        card5: {
          title: 'El fallo es un dato, no una vergüenza',
          body: 'Los sistemas distribuidos fallan. La pregunta es qué aprendes. Los error budgets hacen explícito el contrato de fiabilidad — un acuerdo formal entre velocidad y estabilidad. Los postmortems sin culpa convierten los incidentes en memoria institucional. Cada fallo debería hacer el siguiente más barato.'
        },
        card6: {
          title: 'No puedes mejorar lo que no observas',
          body: 'El monitoring te dice que algo está roto. La observabilidad te dice por qué. Los SLIs y SLOs no son métricas de dashboard — son compromisos. Las métricas DORA miden si la entrega está mejorando realmente con el tiempo. Sin datos, la mejora es solo opinión.'
        }
      },
      resume: {
        title: 'Experiencia Laboral',
        subtitle: 'Estos son los roles y responsabilidades que he desempeñado a lo largo de mi carrera.',
        quadrant: { desc: 'IaC completa con Terraform, GitOps con ArgoCD y pipelines de CI/CD centralizados en GitLab. Cada entorno declarativo, cada despliegue automatizado, cada secreto fuera del repositorio.' },
        '2gether': { desc: 'SRE integrado en un banco challenger regulado con servicios financieros en cripto y fiat. Responsable de la infraestructura cloud, el stack de observabilidad y los pipelines de CI/CD — manteniendo estables las operaciones en tiempo real mientras se reducían continuamente los costes de infraestructura.' },
        yogabot: { desc: 'Proyecto de I+D explorando arquitectura blockchain y tokenomics para un ecosistema de bienestar descentralizado.' },
        personal: { desc: 'Terminé una carrera universitaria pendiente mientras profundizaba en inversiones, mercados financieros y tecnologías de registro distribuido.' },
        fintonic: { desc: 'DevOps/SRE en una plataforma de finanzas personales con presencia en España y América Latina. Contribuí a una renovación de infraestructura de tres años — migrando de IaaS a Kubernetes, construyendo pipelines de CI/CD y herramientas de IaC, e integrando observabilidad en todo el stack. La producción se mantuvo operativa durante todo el proceso.' },
        kimia: { desc: 'Primer trabajo en IT, en una empresa global de publicidad digital. Aprovisioné y gestioné servidores bare metal Linux e infraestructura cloud en AWS, construí pipelines de CI/CD e integré monitorización en toda la plataforma. La base sobre la que se construyó todo lo demás.' }
      },
      skills: {
        title: 'Experiencia Técnica',
        subtitle: 'Herramientas y tecnologías utilizadas en producción — cloud, contenedores, pipelines y observabilidad.'
      },
      studies: {
        title: 'soy ex-alumno de...',
        uc3m: { degree: 'Grado en Ingeniería Telemática' },
        cujae: { degree: 'Ingeniería en Telecomunicaciones y Electrónica' },
        fdp: {
          label: 'Proyecto Fin de Grado',
          title: 'Pasarela Zigbee para Entorno IoT',
          body: 'Arquitectura IoT end-to-end que conecta sensores Zigbee con AWS vía MQTT — construida sobre Raspberry Pi con Node-RED y Zigbee2MQTT.',
          cta: 'Ver Proyecto'
        }
      },
      contact: {
        title: 'Construyamos Algo Juntos.',
        body: '¿Tienes una plataforma que construir, un problema de fiabilidad que resolver, o simplemente quieres hablar de ingeniería? Te escucho.'
      },
      page_2gether: {
        hero: 'Ingeniero de Fiabilidad @ ',
        intro: '2gether era un banco challenger que ofrecía servicios financieros en criptomonedas y fiat. Como parte del equipo SRE, mantuve la fiabilidad y escalabilidad de una infraestructura AWS multiservicios que soportaba operaciones financieras en tiempo real para una base de usuarios en crecimiento.',
        role_title: 'Mi Rol y Responsabilidades',
        li1: 'Gestioné infraestructura AWS multi-entorno en desarrollo, staging y producción',
        li2: 'Operé y escalé clústeres EKS con microservicios en contenedores',
        li3: 'Administré bases de datos PostgreSQL en RDS y DynamoDB para cargas no relacionales',
        li4: 'Configuré y mantuve brokers de mensajería: RabbitMQ (Amazon MQ) y Kafka (MSK)',
        li5: 'Construí dashboards de monitorización y alertas técnicas y de negocio en Datadog',
        li6: 'Mantuve pipelines de CI/CD en Jenkins para múltiples microservicios',
        li7: 'Gestioné infraestructura como código, versionada en repositorios Git',
        li8: 'Identifiqué y ejecuté optimizaciones que redujeron los costes operativos',
        stack_title: 'Stack Tecnológico',
        outcomes_title: 'Resultados Clave',
        outcomes: 'Mantuve alta disponibilidad de la plataforma para un producto financiero regulado, mejorando continuamente la fiabilidad de la infraestructura y reduciendo el gasto cloud mediante optimización sistemática.'
      },
      page_fintonic: {
        hero: 'Ingeniero DevOps @ ',
        intro: 'Fintonic es una plataforma de gestión de finanzas personales que opera en España y América Latina. Como parte del equipo DevOps/SRE, contribuí a modernizar la infraestructura — evolucionando de un modelo IaaS gestionado con Chef en AWS hacia una plataforma más fiable, mantenible y escalable basada en Kubernetes, manteniendo producción operativa durante toda la transición.',
        role_title: 'Mi Rol y Responsabilidades',
        li1: 'Contribuí a la migración de la plataforma de un modelo IaaS (AWS + Chef) a una arquitectura PaaS basada en Kubernetes, incluyendo el mantenimiento y mejora de la infraestructura existente durante la transición',
        li2: 'Ayudé a implementar un sistema de CI/CD con GitLab, GitLab CI y Docker, mejorando la automatización del despliegue en los equipos de ingeniería',
        li3: 'Gestioné infraestructura como código con Terraform, Ansible y Packer, versionada en Git',
        li4: 'Configuré monitorización, observabilidad y alertas en toda la plataforma con Datadog, Sentry y el stack ELK',
        li5: 'Administré y mantuve bases de datos en producción: MongoDB, MySQL y RDS en AWS',
        li6: 'Administré y mantuve brokers de mensajes RabbitMQ para comunicación entre microservicios basada en eventos',
        stack_title: 'Stack Tecnológico',
        outcomes_title: 'Resultados Clave',
        outcomes: 'Participé en una evolución completa de la plataforma de IaaS a Kubernetes durante tres años, contribuyendo a mejorar la frecuencia de despliegue, la consistencia de entornos y la visibilidad operativa en todo el stack.'
      },
      page_kimia: {
        hero: 'Arquitecto de Sistemas Junior @ ',
        intro: 'Kimia es una empresa global de publicidad digital y marketing de resultados. Como Arquitecto de Sistemas Junior en el equipo de Operaciones, gestioné y evolucioné la infraestructura que soportaba la plataforma de negocio — mi primer rol profesional en infraestructura IT.',
        role_title: 'Mi Rol y Responsabilidades',
        li1: 'Resolví incidencias y mantuve la disponibilidad de la plataforma de negocio',
        li2: 'Aprovisioné y gestioné servidores bare metal con Debian, CentOS y Ubuntu',
        li3: 'Automaticé la configuración y el aprovisionamiento de servidores con Puppet y Foreman',
        li4: 'Gestioné el almacenamiento de logs y los procesos de backup de aplicaciones',
        li5: 'Administré bases de datos MongoDB y MySQL en producción',
        li6: 'Desarrollé y operé infraestructura cloud en AWS',
        li7: 'Construí y mantuve pipelines de CI/CD con Jenkins y Ansible',
        li8: 'Monitoricé la salud de la plataforma con Nagios, CloudWatch, PagerDuty y Munin',
        li9: 'Gestioné repositorios de código fuente en Bitbucket y SVN',
        li10: 'Administré servidores DNS para el dominio de negocio',
        stack_title: 'Stack Tecnológico',
        outcomes_title: 'Resultados Clave',
        outcomes: 'Construí las bases operativas en monitorización, gestión de configuración e infraestructura cloud para una plataforma global de ad-tech, adquiriendo experiencia práctica en toda la cadena de herramientas de sysadmin Linux y DevOps.'
      },
      page_iot: {
        hero: 'Pasarela Zigbee para Entorno IoT',
        intro: 'Proyecto fin de grado en el que diseñé una arquitectura de pasarela IoT basada en Zigbee para un entorno domótico. El objetivo era construir un sistema end-to-end flexible que conectara sensores y actuadores Zigbee de bajo consumo con una interfaz de monitorización y control accesible desde la nube.',
        role_title: 'Mi Rol y Responsabilidades',
        li1: 'Diseñé la arquitectura completa del sistema, desde la red física de sensores hasta la integración cloud',
        li2: 'Flasheé un dongle USB CC2531 con firmware coordinador Zigbee HA y lo conecté a una Raspberry Pi como coordinador de red',
        li3: 'Desplegué Zigbee2MQTT como puente de protocolo entre la red Zigbee y un bus de mensajes MQTT',
        li4: 'Configuré Mosquitto como broker MQTT y establecí un bridge hacia AWS IoT Core para acceso remoto',
        li5: 'Aprovisioné infraestructura AWS (EC2, IoT Core, IAM) para procesamiento en cloud y control de acceso',
        li6: 'Construí flujos de lógica de dispositivos y dashboards de monitorización en Node-RED desplegado en AWS EC2',
        li7: 'Integré una red de cinco dispositivos inalámbricos: sensor de humedad, sensor de contacto, sensor de movimiento, bombilla inteligente e interruptor',
        stack_title: 'Stack Tecnológico',
        outcomes_title: 'Resultados Clave',
        outcomes: 'Entregué un prototipo domótico completamente funcional con acceso remoto y seguro a la nube, integrando dispositivos Zigbee de bajo consumo con AWS a través de un stack IoT completo construido desde cero.',
        doc_cta: 'Documentación del Proyecto',
        flow_cta: 'Flujo de Node-RED'
      },
      page_quadrant: {
        hero: 'Ingeniero SRE / DevOps Engineer @ ',
        intro: 'Quadrant Travel Technology es una empresa espa\u00f1ola de travel-tech que construye la columna vertebral digital para agencias de viajes independientes \u2014 un ecosistema integrado de plataformas de reservas, distribuci\u00f3n y anal\u00edtica con conexiones a m\u00e1s de 22 partners del sector, incluyendo Amadeus, Expedia, Iberia y Hotelbeds. Como parte del equipo SRE/DevOps dise\u00f1\u00e9 y constru\u00ed la infraestructura cloud, la automatizaci\u00f3n del despliegue y la plataforma de fiabilidad operacional desde cero.',
        role_title: 'Mi Rol y Responsabilidades',
        li1: 'Dise\u00f1\u00e9 y constru\u00ed toda la infraestructura AWS desde cero con Infrastructure as Code (Terraform + Terragrunt), incluyendo redes VPC, cl\u00fasteres EKS, RDS Aurora, MSK, ElastiCache, IAM, KMS, S3 y Route53 en entornos dev, qa, pre y prod',
        li2: 'Dise\u00f1\u00e9 e implement\u00e9 una plataforma GitOps completa con ArgoCD \u2014 168 Applications en 76 ApplicationSets cubriendo m\u00e1s de 60 microservicios en contenedores',
        li3: 'Constru\u00ed desde cero plantillas centralizadas de pipelines GitLab CI: escaneo de seguridad, builds Docker multi-entorno, pushes a ECR y despliegues automatizados',
        li4: 'Integr\u00e9 HashiCorp Vault con ArgoCD (plugin AVP) para gesti\u00f3n de secretos sin credenciales en Git, cubriendo m\u00e1s de 200 secretos de aplicaci\u00f3n',
        li5: 'Configur\u00e9 el autoescalado de nodos con Karpenter (spot/on-demand mixto) y el autoescalado de pods con HPA, garantizando alta disponibilidad con PodDisruptionBudgets',
        li6: 'Despliegu\u00e9 y mantengo el stack de observabilidad completo: Prometheus, Grafana, Loki, Jaeger, OpenTelemetry, Elasticsearch',
        li7: 'Gestion\u00e9 Aurora PostgreSQL v17 con r\u00e9plicas de lectura y RDS Proxy para connection pooling en producci\u00f3n',
        li8: 'Oper\u00e9 Apache Kafka (AWS MSK) para streaming de eventos de dominio y Kong API Gateway para el enrutamiento de tr\u00e1fico interno/externo',
        li9: 'Redact\u00e9 runbooks, playbooks de respuesta a incidentes y documentaci\u00f3n operativa para la organizaci\u00f3n de ingenier\u00eda',
        stack_title: 'Stack Tecnol\u00f3gico',
        outcomes_title: 'Resultados Clave',
        outcomes: 'Dise\u00f1\u00e9 y constru\u00ed desde cero una plataforma cloud de calidad productiva en AWS que soporta m\u00e1s de 60 microservicios en contenedores en cuatro entornos aislados, habilitando la entrega continua para una suite de tecnolog\u00eda de viajes utilizada por agencias independientes en Espa\u00f1a. Elimin\u00e9 el drift de infraestructura mediante un enfoque completamente declarativo de GitOps e IaC \u2014 cada recurso versionado, revisado y reconciliado autom\u00e1ticamente. Logr\u00e9 alta disponibilidad multi-AZ mediante el aprovisionamiento de nodos con Karpenter, el escalado de pods con HPA y despliegues sin tiempo de inactividad garantizados con PodDisruptionBudgets. Asegu\u00e9 toda la superficie de secretos \u2014 m\u00e1s de 200 secretos de aplicaci\u00f3n con HashiCorp Vault \u2014 sin credenciales en Git, en ning\u00fan entorno.'
      }
    }
  };

  function getKey(obj, path) {
    return path.split('.').reduce(function (o, k) { return o && o[k]; }, obj);
  }

  function applyLang(lang) {
    var t = TRANSLATIONS[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = getKey(t, el.getAttribute('data-i18n'));
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var raw = el.getAttribute('data-i18n-attr');
      var idx = raw.indexOf(':');
      if (idx === -1) return;
      var attr = raw.slice(0, idx);
      var key  = raw.slice(idx + 1);
      var val  = getKey(t, key);
      if (val != null) el.setAttribute(attr, val);
    });

    var typedSpan = document.querySelector('.element');
    if (window.__typedInstance && typedSpan) {
      window.__typedInstance.destroy();
      window.__typedInstance = new Typed('.element', {
        strings: typedSpan.getAttribute('data-elements').split(','),
        typeSpeed: 100,
        backDelay: 3000,
        loop: true
      });
    }

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('preferred-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }

  function init() {
    var saved = localStorage.getItem('preferred-lang') || 'en';

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        applyLang(el.getAttribute('data-lang'));
      });
      el.classList.toggle('active', el.getAttribute('data-lang') === saved);
    });

    if (saved !== 'en') applyLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
