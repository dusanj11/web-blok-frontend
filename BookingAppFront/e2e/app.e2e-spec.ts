import { BookingAppFrontPage } from './app.po';

describe('booking-app-front App', () => {
  let page: BookingAppFrontPage;

  beforeEach(() => {
    page = new BookingAppFrontPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
