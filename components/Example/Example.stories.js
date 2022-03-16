import ExampleTwig from './Example.twig';

export default { title: 'Example' };

export const Example = (_, { loaded: { renderedStory } }) => renderedStory;

Example.args = {
    foo: "It's working",
}

Example.render = async args => {
    return await ExampleTwig({
        ...Example.args
    })
}