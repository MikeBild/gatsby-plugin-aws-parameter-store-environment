require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const { SSM } = require('aws-sdk');
const { constantCase } = require('change-case');

exports.onPreInit = async ({ reporter }, { aws }) => {
  const ssm = new SSM(aws);
  const { Parameters = [] } = await ssm.describeParameters().promise();
  const Names = Parameters.map(({ Name }) => Name);
  const { Parameters: allParameters } = await ssm
    .getParameters({
      Names,
    })
    .promise();

  reporter.success(
    `Start mapping AWS parameter store parameters to environment variables`
  );

  allParameters.forEach(itm => {
    const key = constantCase(itm.Name);
    const value = itm.Value;
    const hasExistingValue = Boolean(process.env[key]);

    if (hasExistingValue) return;
    reporter.success(`Environment variable ${key} created`);
    process.env[key] = value;
  });
};
