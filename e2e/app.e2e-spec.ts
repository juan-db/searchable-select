import { SearchableSelectPage } from './app.po';

describe('searchable-select App', function() {
  let page: SearchableSelectPage;

  beforeEach(() => {
    page = new SearchableSelectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
