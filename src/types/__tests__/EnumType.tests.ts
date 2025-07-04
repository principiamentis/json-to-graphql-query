
import { expect } from 'chai';
import { jsonToGraphQLQuery, EnumType, type QueryJSON } from '../../';

describe('EnumType()', () => {

    it('converts a query with enum arguments', () => {
        const query: QueryJSON = {
            query: {
                Posts: {
                    __args: {
                        status: new EnumType('PUBLISHED')
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        expect(jsonToGraphQLQuery(query, { pretty: true })).to.equal(
`query {
    Posts (status: PUBLISHED) {
        id
        title
        post_date
    }
}`);
    });
});