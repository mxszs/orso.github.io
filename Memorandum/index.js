new Vue({
	el: "#app",

	data: {
		xx: JSON.parse(localStorage.todo ? localStorage.todo : '[]').length,
		todo: JSON.parse(localStorage.todo ? localStorage.todo : [{new: "chenpig", isFinished: false, isShowseleted: false, id: 1}]),
		showType: "all",
		types: [{
			type: "all",
			con: "所有"
		}, {
			type: "fin",
			con: "完成"
		}, {
			type: "unfin",
			con: "未完"
		}],
		isShowNew: false,
		newtodo: '',
		isShowselet: false,
		isfill: false,
		isShowEdit: false,
		edited: '',
		_id: ''

	},
	methods: {
		addNew: function() {
			console.log(this.newtodo)
			this.xx++,
				console.log(this.xx)
			this.todo.push({
				new: this.newtodo,
				isFinished: false,
				isShowseleted: false,
				id: this.xx
			})
			this.isShowNew = false;
			this.updateStorage()
			this.newtodo = ''
		},
		finish: function(id) {
			this.todo.forEach((item) => {
				if(item.id == id) {
					item.isFinished = !item.isFinished
				}
			})
			this.updateStorage()
		},
		remove: function(id) {
			for(let i = 0; i < this.todo.length; i++) {
				if(this.todo[i].id == id) {
					this.todo.splice(i, 1)
				}

			}
			this.updateStorage()
			return;
		},
		updateStorage() {
			localStorage.todo = JSON.stringify(this.todo)
		},
		finnise: function() {
			this.todo.forEach((item) => {
				if(item.isShowseleted) {
					item.isFinished = true
				}
			})
			this.updateStorage()
		},
		unfinnise: function() {
			this.todo.forEach((item) => {
				if(item.isShowseleted) {
					item.isFinished = false
				}
			})
			this.updateStorage()
		},
		removetodo: function() {
			for(let i = 0; i < this.todo.length; i++) {
				if(this.todo[i].isShowseleted) {
					this.todo.splice(i, 1)
					this.removetodo()
				}

			}
			this.updateStorage()

		},
		all: function() {
			console.log(1)
			for(let i = 0; i < this.todo.length; i++) {
				if(!this.todo[i].isShowseleted) {
					this.todo[i].isShowseleted = true
					this.isfill = true
				} else {
					this.todo[i].isShowseleted = false
					this.isfill = false
				}
			}
			this.updateStorage()
		},
		getId: function(id) {
			this.todo.forEach((item) => {
				if(item.id == id) {
					this.edited = item.new,
						this._id = id
				}
			})
			this.isShowEdit = true
		},
		edit: function(_id) {
			this.todo.forEach((item) => {
				if(item.id == _id) {
					item.new = this.edited,
						isFinished = false,
						isShowseleted = false
				}
			})
			this.updateStorage()
			this.isShowEdit = false
		}

	},
	computed: {
		fin: function() {
			var arr = []
			this.todo.forEach((item) => {
				if(item.isFinished) {
					arr.push(item)
				}
			});
			return arr;
		},
		unfin: function() {
			var arr = []
			this.todo.forEach((item) => {
				if(!item.isFinished) {
					arr.push(item)
				}
			});
			return arr;
		},
		showTodo: function() {
			switch(this.showType) {
				case 'all':
					return this.todo;
					break;
				case 'fin':
					return this.fin;
					break;
				case 'unfin':
					return this.unfin;
					break;
				default:
					return this.todo;
					break;
			}
		}

	},
	watch: {
		isShowselet: function(val) {
			this.todo.forEach((item) => {
				if(val) {
					item.isShowseleted = false
				}
			})
			this.isfill = false
		}
	}

})