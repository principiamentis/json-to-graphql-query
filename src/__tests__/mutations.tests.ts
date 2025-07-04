import { expect } from 'chai';
import { jsonToGraphQLQuery, type MutationJSON } from '../';

describe('jsonToGraphQLQuery() - mutations', () => {
    it('simple mutation', () => {
        const mutation: MutationJSON = {
            mutation: {
                delete_post: {
                    __args: { id: 1234 },
                    id: true
                }
            }
        };
        expect(jsonToGraphQLQuery(mutation, { pretty: true })).to.equal(
            `mutation {
    delete_post (id: 1234) {
        id
    }
}`
        );
    });

    it('correctly converts mutations with no specified return fields', () => {
        const query: MutationJSON = {
            mutation: {
                create_post: {
                    __args: {
                        title: 'My Awesome Post',
                        body: 'This post is awesome!'
                    }
                }
            }
        };
        expect(jsonToGraphQLQuery(query, { pretty: true })).to.equal(
            `mutation {
    create_post (title: "My Awesome Post", body: "This post is awesome!")
}`
        );
    });
});
