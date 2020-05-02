declare module 'draft-js-prism' {
  class PrismDecorator {
    constructor(options: { defaultSyntax: string; prism: typeof Prism });
  }

  export default PrismDecorator;
}
