package org.springframework.samples.petclinic.v1.dtos;

public class ResponseData<T> {
    private T data = null;

    public ResponseData() {
    }

    public ResponseData(T data) {
        this.data = data;
    }

    public T getData() {
        return this.data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
