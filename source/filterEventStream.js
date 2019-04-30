export { filterEventStream };

const filterEventStream = (emitter, sourceEventName, filteredEventName, filter) => {
    const filterEventStreamFunction = (x) => {
        if (filter(x)) {
            emitter.emit(filteredEventName, x);
        }
    };
    emitter.on(sourceEventName, filterEventStreamFunction);
    return filterEventStreamFunction; // allows off
};
