export const run = (something: string): string =>  {
    console.log(something);
    return `SUCCESS...wrote "${something}"`;
}

run('This is the saySomethiing script!');
