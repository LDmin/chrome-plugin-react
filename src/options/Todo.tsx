import React, { useEffect, useCallback, useMemo } from 'react'
import {
  Calendar,
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
} from 'antd'
import styled from 'styled-components'
import { v4 } from 'uuid'
import useStorage from '../components/useStorage'
import moment from 'moment'
import Table, { TableProps, ColumnProps } from 'antd/lib/table'
import { useDynamicList } from '@umijs/hooks'

import { TIME_FORMAT, DATE_FORMAT } from '../constant'

export default () => {
  const [todos, setTodos] = useStorage<Todos>('todos', [])

  const { list, resetList, replace, push, remove } = useDynamicList<Todo>([])

  useEffect(() => {
    resetList(
      todos.map((todo) => ({
        ...todo,
        disabled:
          todo.disabled ||
          moment().isAfter(
            moment(`${todo.end} ${todo.time}`, `${DATE_FORMAT} ${TIME_FORMAT}`)
          ),
      }))
    )
  }, [todos])

  const onFieldChange = useCallback(
    (index: number, key: string, value: any) => {
      replace(index, {
        ...list[index],
        [key]: value,
      })
    },
    [list]
  )

  const add = useCallback((todo?: Todo) => {
    push({
      type: 'notification',
      title: '',
      message: '',
      contextMessage: '',
      time: moment().format(TIME_FORMAT),
      ...todo,
      id: v4(),
      end: moment().format(DATE_FORMAT),
      disabled: false,
    })
  }, [])

  const save = useCallback(() => {
    setTodos(list)
    console.log(list)
  }, [list])

  const columns: ColumnProps<Todo>[] = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'title',
      render: (t, r, i) => (
        <Input
          disabled={r.disabled}
          placeholder="name"
          value={t}
          onChange={(e) => onFieldChange(i, 'title', e.target.value)}
        />
      ),
    },
    {
      key: 'start',
      dataIndex: 'start',
      title: 'start',
      render: (t, r, i) => (
        <DatePicker
          disabled={r.disabled}
          value={t ? moment(t, DATE_FORMAT) : null}
          onChange={(v) =>
            onFieldChange(i, 'start', v?.format(DATE_FORMAT) ?? '')
          }
        />
      ),
    },
    {
      key: 'end',
      dataIndex: 'end',
      title: 'end',
      render: (t, r, i) => (
        <DatePicker
          disabled={r.disabled}
          allowClear={false}
          value={moment(t, DATE_FORMAT)}
          onChange={(v) => onFieldChange(i, 'end', v!.format(DATE_FORMAT))}
        />
      ),
    },
    {
      key: 'time',
      dataIndex: 'time',
      title: 'time',
      // render: t => moment(t, TIME_FORMAT).format(TIME_FORMAT),
      render: (t, r, i) => (
        <TimePicker
          disabled={r.disabled}
          allowClear={false}
          value={moment(t, TIME_FORMAT)}
          onChange={(v) => onFieldChange(i, 'time', v!.format(TIME_FORMAT))}
        />
      ),
    },
    // {
    //   key: 'id',
    //   dataIndex: 'id',
    //   title: 'id',
    // },
    {
      key: 'm',
      title: '',
      render: (t, r, i) => (
        <>
          <Button
            type="danger"
            onClick={(e) => {
              remove(i)
            }}
          >
            delete
          </Button>
          <Button
            onClick={(e) => {
              add(r)
            }}
          >
            copy
          </Button>
        </>
      ),
    },
  ]

  // useEffect(() => {
  //   const uuid = v4()
  //   const newTodo = {
  //     ...todos,
  //     [uuid]: {
  //       type: 'notification',
  //       end: moment().add(20, 's').valueOf(),
  //       title: 'a test',
  //       message: 'a message',
  //       contextMessage: 'contextMessage',
  //     } as Todo
  //   }
  //   console.log(newTodo)
  //   setTodos(newTodo)
  // }, [])

  return (
    <Card
      id="antd-anchor-todo"
      title="Todo"
      extra={
        <>
          <Button type="primary" onClick={save}>
            保存
          </Button>
        </>
      }
    >
      <Table rowKey="id" dataSource={list} columns={columns} />
      <Button
        style={{ marginTop: 8 }}
        block
        type="dashed"
        onClick={(e) => add()}
      >
        + Add row
      </Button>
      {JSON.stringify(list)}
    </Card>
  )
}
