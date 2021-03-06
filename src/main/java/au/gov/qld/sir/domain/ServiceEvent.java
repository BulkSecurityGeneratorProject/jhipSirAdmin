package au.gov.qld.sir.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ServiceEvent.
 */
@Entity
@Table(name = "service_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @Column(name = "created_by", length = 255)
    private String createdBy;

    @Column(name = "created_date_time")
    private Instant createdDateTime;

    @Size(max = 255)
    @Column(name = "modified_by", length = 255)
    private String modifiedBy;

    @Column(name = "modified_date_time")
    private Instant modifiedDateTime;

    @Column(name = "version")
    private Long version;

    @Column(name = "service_event_sequence")
    private Integer serviceEventSequence;

    @ManyToOne
    @JsonIgnoreProperties("serviceEvents")
    @JoinColumn(name = "service_id")
    private ServiceRecord serviceRecord;

    @ManyToOne
    @JsonIgnoreProperties("serviceEvents")
    private ServiceEventType serviceEventType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public ServiceEvent createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDateTime() {
        return createdDateTime;
    }

    public ServiceEvent createdDateTime(Instant createdDateTime) {
        this.createdDateTime = createdDateTime;
        return this;
    }

    public void setCreatedDateTime(Instant createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public ServiceEvent modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Instant getModifiedDateTime() {
        return modifiedDateTime;
    }

    public ServiceEvent modifiedDateTime(Instant modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
        return this;
    }

    public void setModifiedDateTime(Instant modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public Long getVersion() {
        return version;
    }

    public ServiceEvent version(Long version) {
        this.version = version;
        return this;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public Integer getServiceEventSequence() {
        return serviceEventSequence;
    }

    public ServiceEvent serviceEventSequence(Integer serviceEventSequence) {
        this.serviceEventSequence = serviceEventSequence;
        return this;
    }

    public void setServiceEventSequence(Integer serviceEventSequence) {
        this.serviceEventSequence = serviceEventSequence;
    }

    public ServiceRecord getServiceRecord() {
        return serviceRecord;
    }

    public ServiceEvent serviceRecord(ServiceRecord serviceRecord) {
        this.serviceRecord = serviceRecord;
        return this;
    }

    public void setServiceRecord(ServiceRecord serviceRecord) {
        this.serviceRecord = serviceRecord;
    }

    public ServiceEventType getServiceEventType() {
        return serviceEventType;
    }

    public ServiceEvent serviceEventType(ServiceEventType serviceEventType) {
        this.serviceEventType = serviceEventType;
        return this;
    }

    public void setServiceEventType(ServiceEventType serviceEventType) {
        this.serviceEventType = serviceEventType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceEvent)) {
            return false;
        }
        return id != null && id.equals(((ServiceEvent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ServiceEvent{" +
            "id=" + getId() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDateTime='" + getCreatedDateTime() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            ", modifiedDateTime='" + getModifiedDateTime() + "'" +
            ", version=" + getVersion() +
            ", serviceEventSequence=" + getServiceEventSequence() +
            "}";
    }
}
