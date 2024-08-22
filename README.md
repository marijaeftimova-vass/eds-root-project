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
2. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
3. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
4. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)

## Use AEM headless functionality
1. Before using the AEM Headless functionality, ensure that the sandbox environment is not in Hibernate status. If it is, then de-hibernate it.
2. To retrieve data using the AEM Headless feature, you can run a local instance of Google Chrome with security features disabled. Use the following command to start Chrome: `open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials`
3. Open the `aem-eds-demo-aniless` directory in your favorite IDE and start coding :)
