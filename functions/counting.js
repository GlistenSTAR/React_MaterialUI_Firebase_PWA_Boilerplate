
module.exports = {
  handleListChange: (event, counterName) => {
    const collectionRef = event.data.ref.parent;
    const countRef = collectionRef.parent.child(counterName);

    // Return the promise from countRef.transaction() so our function
    // waits for this async event to complete before it exits.
    return countRef.transaction(current => {
      if (event.data.exists() && !event.data.previous.exists()) {
        return (current || 0) + 1;
      }
      else if (!event.data.exists() && event.data.previous.exists()) {
        return (current || 0) - 1;
      }
    }).then(() => {
      console.log(`${counterName} counter updated.`);
    });
  },
  handleRecount: (event, listName) =>{
    if (!event.data.exists()) {
      const counterRef = event.data.ref;
      const collectionRef = counterRef.parent.child(listName);

      // Return the promise from counterRef.set() so our function
      // waits for this async event to complete before it exits.
      return collectionRef.once('value')
      .then(messagesData => counterRef.set(messagesData.numChildren()));
    }
  }
};
