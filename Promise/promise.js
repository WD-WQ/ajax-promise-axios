class MyPromise {
    constructor(executor) {
        this.PromiseState = 'pending'
        this.PromiseResult = null
        this.callbacks = []
        const self = this
        function resolve(data) {
            if (self.PromiseState === 'pending') {
                self.PromiseState = 'fulfilled'
                self.PromiseResult = data
                //执行回调
                if (self.callbacks.length) {
                    self.callbacks.forEach(item => {
                        item.onResolved(data)
                    })
                }
            }
        }
        function reject(err) {
            if (self.PromiseState === 'pending') {
                self.PromiseState = 'rejected'
                self.PromiseResult = err
                if (self.callbacks.length) {
                    self.callbacks.forEach(item => {
                        item.onRejected(data)
                    })
                }
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onResolved, onRejected) {
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }
        }
        if (typeof onResolved !== 'function') {
            onResolved = value => value
        }
        return new MyPromise((resolve, reject) => {
            function callback(type) {
                setTimeout(() => {
                    try {
                        let result = type(this.PromiseResult)
                        if (result instanceof MyPromise) {
                            result.then(data => {
                                resolve(data)
                            }, err => {
                                reject(err)
                            })
                        } else {
                            resolve(result)
                        }
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            }
            if (this.PromiseState === 'rejected') {
                callback(onRejected)
            }
            else if (this.PromiseState === 'fulfilled') {
                callback(onResolved)
            }
            else if (this.PromiseState === 'pending') {
                //保存回调函数
                this.callbacks.push({
                    onResolved: () => {
                        callback(onResolved)
                    },
                    onRejected: () => {
                        callback(onRejected)
                    }
                })
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    static resolve(data) {
        return new MyPromise((resolve, reject) => {
            if (data instanceof MyPromise) {
                data.then(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
            }
            else {
                resolve(data)
            }
        })
    }

    static reject(data) {
        return new MyPromise((resolve, reject) => {
            if (data instanceof MyPromise) {
                reject(data.PromiseResult)
            }
            else {
                reject(data)
            }
        })
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            let count = 0
            let arr = []
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(data => {
                    count++;
                    arr[i] = data
                    if (count === promises.length) {
                        resolve(arr)
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }

    static race() {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
            }
        })
    }
}


// function MyPromise(executor) {
//     this.PromiseState = 'pending'
//     this.PromiseResult = null
//     this.callbacks = []
//     const self = this
//     function resolve(data) {
//         if (self.PromiseState === 'pending') {
//             self.PromiseState = 'fulfilled'
//             self.PromiseResult = data
//             //执行回调
//             if (self.callbacks.length) {
//                 self.callbacks.forEach(item => {
//                     item.onResolved(data)
//                 })
//             }
//         }
//     }
//     function reject(err) {
//         if (self.PromiseState === 'pending') {
//             self.PromiseState = 'rejected'
//             self.PromiseResult = err
//             if (self.callbacks.length) {
//                 self.callbacks.forEach(item => {
//                     item.onRejected(data)
//                 })
//             }
//         }
//     }
//     try {
//         executor(resolve, reject)
//     } catch (e) {
//         reject(e)
//     }
// }

// MyPromise.prototype.then = function (onResolved, onRejected) {
//     if (typeof onRejected !== 'function') {
//         onRejected = reason => {
//             throw reason
//         }
//     }
//     if (typeof onResolved !== 'function') {
//         onResolved = value => value
//     }
//     return new MyPromise((resolve, reject) => {
//         function callback(type) {
//             setTimeout(() => {
//                 try {
//                     let result = type(this.PromiseResult)
//                     if (result instanceof MyPromise) {
//                         result.then(data => {
//                             resolve(data)
//                         }, err => {
//                             reject(err)
//                         })
//                     } else {
//                         resolve(result)
//                     }
//                 } catch (err) {
//                     reject(err)
//                 }
//             }, 0)
//         }
//         if (this.PromiseState === 'rejected') {
//             callback(onRejected)
//         }
//         else if (this.PromiseState === 'fulfilled') {
//             callback(onResolved)
//         }
//         else if (this.PromiseState === 'pending') {
//             //保存回调函数
//             this.callbacks.push({
//                 onResolved: () => {
//                     callback(onResolved)
//                 },
//                 onRejected: () => {
//                     callback(onRejected)
//                 }
//             })
//         }
//     })
// }

// MyPromise.prototype.catch = function (onRejected) {
//     return this.then(undefined, onRejected)
// }

// MyPromise.resolve = function (data) {
//     return new MyPromise((resolve, reject) => {
//         if (data instanceof MyPromise) {
//             data.then(data => {
//                 resolve(data)
//             }, err => {
//                 reject(err)
//             })
//         }
//         else {
//             resolve(data)
//         }
//     })
// }

// MyPromise.reject = function (data) {
//     return new MyPromise((resolve, reject) => {
//         if (data instanceof MyPromise) {
//             reject(data.PromiseResult)
//         }
//         else {
//             reject(data)
//         }
//     })
// }

// MyPromise.all = function (promises) {
//     return new MyPromise((resolve, reject) => {
//         let count = 0
//         let arr = []
//         for (let i = 0; i < promises.length; i++) {
//             promises[i].then(data => {
//                 count++;
//                 arr[i] = data
//                 if (count === promises.length) {
//                     resolve(arr)
//                 }
//             }, err => {
//                 reject(err)
//             })
//         }
//     })
// }

// MyPromise.race = function () {
//     return new MyPromise((resolve, reject) => {
//         for (let i = 0; i < promises.length; i++) {
//             promises[i].then(data => {
//                 resolve(data)
//             }, err => {
//                 reject(err)
//             })
//         }
//     })
// }