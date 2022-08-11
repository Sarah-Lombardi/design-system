import { createElement as h } from 'react';
import { jest } from '@jest/globals';
import { mount, shallow } from '@not-govuk/component-test-helpers';
import Pagination from '../src/Pagination';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useLocation } from 'react-router';

Enzyme.configure({ adapter: new Adapter() });

// useLocation mock
jest.mock('@not-govuk/route-utils', () => ({
  ...jest.requireActual('@not-govuk/route-utils'),
  useLocation: () => ({
    hash: '',
    pathname: '',
    query: { page: 2 },
    search: '',
    state: undefined,
  }),
}));

describe('Pagination', () => {
  describe('when given valid props and valid url location data', () => {
    const pagination = mount(
      h(Pagination, {
        results: 249,
        resultsPerPage: 25,
        page: 3, // location taken from mocked urlLocation hook
      })
    );

    let current;
    beforeAll(() => {
      expect(
        (current = pagination.find('.hods-pagination__link--current'))
      ).toHaveLength(1);
    });

    it('is on the correct page', () => {
      expect(current.text()).toEqual('2');
    });

    it('should not have a link', () => {
      expect(current.html()).toContain('href=\'\'');
    });

    const summary = pagination.find('.hods-pagination__summary').text();

    it('displays the correct value for results from', () => {
      expect(summary.slice(8, 10)).toEqual('26');
    });

    it('displays the correct value for results to', () => {
      expect(summary.slice(13, 15)).toEqual('50');
    });

    it('displays the correct value for total results', () => {
      expect(summary.slice(19, 22)).toEqual('249');
    });

    const ul = pagination.find('.hods-pagination__list-items');
    const prev = pagination.find('#prevButton');
    const next = pagination.find('#nextButton');

    it('displays the previous link in the correct place', () => {
      expect(ul.childAt(0)).toEqual(prev);
    });

    it('displays the next link in the correct place', () => {
      expect(ul.childAt(6)).toEqual(next);
    });

    const content = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    const items = content.map((c, i) => h(
      'div', {
        key: i,
        id: c.toString()
      },
      c.toString()
    ));
    const props = {
      results: content.length,
      resultsPerPage: 5,
      page: 1,
      children: items
    };

    it('paginates content using url parameters', () => {
      const wrapper = shallow(h(Pagination, props));

      expect(
        wrapper.find('.hods-pagination__content').children().length
      ).toEqual(5);
      expect(wrapper.find('[id="6"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="7"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="8"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="9"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="10"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="1"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="2"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="3"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="4"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="5"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="11"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="12"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="13"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="14"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="15"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="16"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="17"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="18"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="19"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="20"]').exists()).toBeFalsy();
    });

    it.skip('moves to the next page when \'next\' is clicked', () => {
      const wrapper = shallow(h(Pagination, {
        ...props,
        results: 20,
        resultsPerPage: 5,
        page: 1
      }));
      // assert correct starting page as page 2
      expect(wrapper.find('.hods-pagination__link--current').text()).toEqual(
        '2'
      );
      // click next button
      wrapper.find('[id="nextButton"]').simulate('click');
      // assert correct new page as page 3
      expect(wrapper.find('.hods-pagination__link--current').text()).toEqual(
        '3'
      );
      // check that the correct content is being shown on page 3
      expect(wrapper.find('[id="11"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="12"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="13"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="14"]').exists()).toBeTruthy();
      expect(wrapper.find('[id="15"]').exists()).toBeTruthy();
      // check that the correct content is not being shown on page 3
      expect(wrapper.find('[id="1"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="3"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="4"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="5"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="6"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="7"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="8"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="9"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="10"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="16"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="17"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="18"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="19"]').exists()).toBeFalsy();
      expect(wrapper.find('[id="20"]').exists()).toBeFalsy();
    });

    it.skip('moves to the previous page when \'previous\' is clicked', () => {});

    it.skip.each([1, 2, 3, 4])(
      'moves to page when page number is clicked',
      (number) => {}
    );
  });
});

describe('when given alternative valid props', () => {
  const pagination = mount(
    h(Pagination, {
      //@ts-ignore
      results: '249',
      //@ts-ignore
      resultsPerPage: '25',
      //@ts-ignore
      page: '3', // location taken from mocked urlLocation hook
    })
  );

  let current;
  beforeAll(() => {
    expect(
      (current = pagination.find('.hods-pagination__link--current'))
    ).toHaveLength(1);
  });

  it('is on the correct page', () => {
    expect(current.text()).toEqual('2');
  });

  it('should not have a link', () => {
    expect(current.html()).toContain('href=""');
  });

  const summary = pagination.find('.hods-pagination__summary').text();

  it('displays the correct value for results from', () => {
    expect(summary.slice(8, 10)).toEqual('26');
  });

  it('displays the correct value for results to', () => {
    expect(summary.slice(13, 15)).toEqual('50');
  });

  it('displays the correct value for total results', () => {
    expect(summary.slice(19, 22)).toEqual('249');
  });

  const ul = pagination.find('.hods-pagination__list-items');
  const prev = pagination.find('#prevButton');
  const next = pagination.find('#nextButton');

  it('displays the previous link in the correct place', () => {
    expect(ul.childAt(0)).toEqual(prev);
  });

  it('displays the next link in the correct place', () => {
    expect(ul.childAt(6)).toEqual(next);
  });
});

// describe('when given no props', () => {
//   const pagination = mount(h(Pagination, {}));

//   let current;
//   beforeAll(() => {
//     expect(
//       (current = pagination.find('.hods-pagination__link--current'))
//     ).toHaveLength(0);
//   });
// });
