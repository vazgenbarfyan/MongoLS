define(["module"], function (module) {
	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	module.exports = function () {
		return {
			list: {},
			setItem: function setItem(obj) {
				this.list[obj.__id] = obj;
			},
			getItem: function getItem(id) {
				return this.list[id];
			},
			removeItem: function removeItem(id) {
				delete this.list[id];
			},
			finder: function finder(query, obj) {
				if (query[Object.keys(query)[0]] === obj[Object.keys(query)[0]]) return true;
			},
			fns: {
				$lt: function $lt(a, b) {
					return a > b;
				},
				$lte: function $lte(a, b) {
					return a >= b;
				},
				$gt: function $gt(a, b) {
					return a < b;
				},
				$gte: function $gte(a, b) {
					return a <= b;
				},
				$eq: function $eq(a, b) {
					return a === b;
				},
				$ne: function $ne(a, b) {
					return a !== b;
				},
				$in: function $in(a, b) {
					return a[0] < b && b < a[1];
				}
			},
			find: function find(query) {
				var that = this;
				var respective = [];
				for (var key in that.list) {
					if (that.testQuery(query, that.list[key])) {
						respective.push(that.list[key]);
					}
				}
				return respective[0];
			},
			testQuery: function testQuery(query, item) {
				var that = this;

				for (var key in query) {
					var queryValue = query[key];
					var value = item[key];

					if ((typeof query === "undefined" ? "undefined" : _typeof(query)) === "object" && typeof value === "number") {
						for (var queryKey in queryValue) {
							if (queryKey.charAt(0) === '$') {
								if (that.fns[queryKey]) {
									console.log(queryKey);
									var queryExp = queryValue[queryKey];
									if (!that.fns[queryKey](queryExp, value)) return false;
								} else return false;
							}
						}
					} else if (queryValue === value) {
						return true;
					} else if (value === undefined) return false;else if ((typeof query === "undefined" ? "undefined" : _typeof(query)) === "object" && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") return that.testQuery(queryValue, value);
				}
				return true;
			},
			finedOne: function finedOne(query) {
				return this.find(query)[0];
			}
		};
	};
});