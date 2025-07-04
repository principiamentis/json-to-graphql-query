
import { expect } from 'chai';
import { jsonToGraphQLQuery, type QueryJSON } from '../';

describe('jsonToGraphQLQuery() - ignoreFields option', () => {

    it('ignores a field that exists in the initial object', () => {
        const query: QueryJSON = {
            query: {
                Posts: {
                    thisShouldBeIgnored: {
                        test: 'a value'
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        expect(jsonToGraphQLQuery(query, {
            pretty: true,
            ignoreFields: ['thisShouldBeIgnored'],
        })).to.equal(
            `query {
    Posts {
        id
        title
        post_date
    }
}`);
    });

    it('we can ignore apollo __typename keys', () => {
        const query: QueryJSON = {
            query: {
                Posts: {
                    __typename: 'Posts',
                    id: true,
                    title: true,
                    post_date: true,
                    subObject: {
                        __typename: 'subObject',
                        test: 'a value'
                    },
                }
            }
        };
        expect(jsonToGraphQLQuery(query, {
            pretty: true,
            ignoreFields: ['__typename'],
        })).to.equal(
            `query {
    Posts {
        id
        title
        post_date
        subObject {
            test
        }
    }
}`);
    });

});
