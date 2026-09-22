# GlideRecord Examples

ServiceNow server-side JavaScript examples demonstrating common GlideRecord patterns for querying and manipulating records.

## Examples

- Retrieve a single record
- Query multiple records
- Use multiple query conditions
- Insert records
- Update records
- Optimize database queries

## Concepts Demonstrated

- GlideRecord
- get()
- addQuery()
- addOrCondition()
- query()
- next()
- getValue()
- getDisplayValue()
- setValue()
- initialize()
- insert()
- update()
- addActiveQuery()
- setLimit()

## Query Patterns

### Retrieve a specific record

Use `get()` when the record is already known, commonly by sys_id.

```javascript
var grUser = new GlideRecord('sys_user');

if (grUser.get(userSysId)) {
    var userName = grUser.getDisplayValue('name');
}
