import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'Stay Fit!';
});

export const handler = resolver.getDefinitions();
