# Aniless Website
Training project for the Adobe Experience Manager Edge Delivery System. The project is a website for a fictional app called Aniless that should motivate people to consume less animal products. 

## Environments
- Preview: https://main--aem-eds-demo-aniless--LikoDevelopment.hlx.page/
- Live: https://main--aem-eds-demo-aniless--LikoDevelopment.hlx.live/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `aem-eds-demo-aniless` directory in your favorite IDE and start coding :)
