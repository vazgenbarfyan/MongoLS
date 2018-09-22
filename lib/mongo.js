module.exports = function () {
	return {
		list: {},
		setItem: function (obj) {
			this.list[obj.__id] = obj;
		},
		getItem: function (id) {
			return this.list[id];
		},
		removeItem: function (id) {
			delete this.list[id];
		},
		fns: {
			$lt: function (a, b) {
				return a > b;
			},
			$lte: function (a, b) {
				return a >= b;
			},
			$gt: function (a, b) {
				return a < b;
			},
			$gte: function (a, b) {
				return a <= b;
			},
			$eq: function (a, b) {
				return a === b;
			},
			$ne: function (a, b) {
				return a !== b;
			},
			$in: function (a, b) {
				return a[0] < b && b < a[1];
			}
		},
		find: function (query) {
			const that = this;
			const respective = [];
			for (const key in that.list) {
				if (that.testQuery(query, that.list[key])) {
					respective.push(that.list[key]);
				}
			}
			return respective;
		},
		testQuery: function (query, item) {
			const that = this;
			for (const key in query) {
				const queryValue = query[key];
				const value = item[key];

				if (typeof queryValue === "object" && typeof value === "number") {
					for (const queryKey in queryValue) {
						if (queryKey.charAt(0) === '$') {
							if (that.fns[queryKey]) {
								const queryExp = queryValue[queryKey];
								if (!that.fns[queryKey](queryExp, value)) return false;
							} else return false;
						}
					}
				}
				if (queryValue === value) {
					return true;
				}
				if (value === undefined) return false;
				if (typeof queryValue === typeof value) {
					if (typeof value === "object") return that.testQuery(queryValue, value);
					if (queryValue !== value) return false;
				}
			}
			return true;
		},
		finedOne: function (query) {
			return this.find(query)[0];
		}
	};
};