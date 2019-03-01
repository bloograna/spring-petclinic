package org.springframework.samples.petclinic.exceptions;

public class ServiceException extends RuntimeException {
    private int status = 500;

    public ServiceException(int status, String msg) {
        super(msg);
        this.status = status;
    }

    public ServiceException(String msg) {
        super(msg);
    }

    public ServiceException(String msg, Throwable throwable) {
        super(msg, throwable);
    }

    public ServiceException(Throwable throwable) {
        super(throwable);
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
