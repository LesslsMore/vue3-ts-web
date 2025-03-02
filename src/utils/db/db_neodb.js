import Dexie from 'dexie'
import {exportDB, importDB} from "dexie-export-import"
import {saveAs} from 'file-saver'

// 初始化数据库
const db = new Dexie('neodb')

// 定义所有支持的类型
const categories = ['book', 'movie', 'tv', 'music', 'game']

// 动态创建表结构
const stores = {}
categories.forEach(category => {
    stores[category] = '[type+page], type, page'
})

db.version(1).stores(stores)

// 导出 indexeddb 数据
async function export_db() {
    console.log('export_db:')
    console.log(new Date())
    let databases = await Dexie.getDatabaseNames()
    console.log(databases)

    const database = 'neodb'

    console.log(database)
    const blob = await exportDB(db);
    saveAs(blob, `IndexedDB_${database}.json`);

    console.log(new Date())
}

// 导入 indexeddb 数据
async function import_db(file) {
    console.log('import_db:')
    console.log(new Date())
    console.log(file)
    const blob = new Blob([file.raw], { type: file.raw.type });
    await importDB(blob);
    console.log(new Date())
}

export {export_db, import_db, categories, db}
