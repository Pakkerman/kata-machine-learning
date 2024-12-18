package array_list

import (
	"errors"
	"fmt"
)

type ArrayList[T any] struct {
	data     []T
	capacity int
	length   int
}

func MakeArrayList[T any](capacity int) *ArrayList[T] {
	if capacity < 3 {
		fmt.Println("Set capacity to 3")
		capacity = 3
	}

	return &ArrayList[T]{
		data:     make([]T, capacity),
		capacity: capacity,
		length:   0,
	}
}

func (a *ArrayList[T]) Prepend(item T) error {
	a.length++
	a.resize()
	err := a.resize()
	if err != nil {
		return err
	}

	for i := a.length - 1; i > 0; i-- {
		a.data[i] = a.data[i-1]
	}

	a.data[0] = item

	return nil
}

func (a *ArrayList[T]) Append(item T) error {
	a.length++
	err := a.resize()
	if err != nil {
		return err
	}

	a.data[a.length-1] = item
	return nil
}

func (a *ArrayList[T]) InsertAt(item T, idx int) error {
	if idx == 0 {
		return a.Prepend(item)
	}
	if idx == a.length-1 {
		return a.Append(item)
	}

	if idx < 0 || a.length <= idx {
		return errors.New("idx out of bounds")
	}

	a.length++
	a.resize()

	for i := a.length - 1; i > idx; i-- {
		a.data[i] = a.data[i-1]
	}

	return nil
}

func (a *ArrayList[T]) Get(idx int) (T, error) {
	if idx < 0 || a.length <= idx {
		var z T
		return z, errors.New("idx out of bounds")
	}
	return a.data[idx], nil
}

func (a *ArrayList[T]) RemoveAt(idx int) (T, error) {
	var z T
	if idx < 0 || idx <= a.length {
		return z, errors.New("idx out of bounds")
	}

	z = a.data[idx]
	a.length--

	for i := idx; i < a.length; i++ {
		a.data[i] = a.data[i+1]
	}

	return z, nil
}

func (a *ArrayList[T]) resize() error {
	if a.length < a.capacity {
		return nil
	}

	data := a.data
	for i := 0; i < a.length; i++ {
		a.data[i] = data[i]
	}

	return nil
}
