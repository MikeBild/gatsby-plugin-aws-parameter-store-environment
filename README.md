# Gatsby AWS Parameter Store Environment Plugin

> Gatsby plugin to map AWS parameter store paramters to environment variables at build time.

## Conceptual thoughts

- Loads all parameters from [AWS System Manager / Parameter Store](https://aws.amazon.com/de/systems-manager/features/)
- Apply AWS Parameter-Store parameters to local snake-case environment variables
- `.env.*` overrides Parameter-Store environment variables

## Setup

- `npm install gatsby-plugin-aws-parameter-store-environment --save-dev`
- `yarn add gatsby-plugin-aws-parameter-store-environment --dev`

## How to use?

**`gatsby-config.js`**

Use `AWS_SDK_LOAD_CONFIG=1` or configure AWS credentials via plugin options.

```javascript
{
  resolve: 'gatsby-plugin-aws-parameter-store-environment',
  options: {
    aws: {
      region: 'eu-central-1'
    }
  },
}
```
