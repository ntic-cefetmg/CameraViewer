package br.cefetmg.cameraviewer.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Camera.
 */
@Entity
@Table(name = "camera")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Camera implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "access_url", nullable = false)
    private String accessURL;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "camera_users_with_access",
               joinColumns = @JoinColumn(name="cameras_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="users_with_accesses_id", referencedColumnName="id"))
    private Set<User> usersWithAccesses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Camera description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccessURL() {
        return accessURL;
    }

    public Camera accessURL(String accessURL) {
        this.accessURL = accessURL;
        return this;
    }

    public void setAccessURL(String accessURL) {
        this.accessURL = accessURL;
    }

    public Set<User> getUsersWithAccesses() {
        return usersWithAccesses;
    }

    public Camera usersWithAccesses(Set<User> users) {
        this.usersWithAccesses = users;
        return this;
    }

    public Camera addUsersWithAccess(User user) {
        this.usersWithAccesses.add(user);
        return this;
    }

    public Camera removeUsersWithAccess(User user) {
        this.usersWithAccesses.remove(user);
        return this;
    }

    public void setUsersWithAccesses(Set<User> users) {
        this.usersWithAccesses = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Camera camera = (Camera) o;
        if (camera.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), camera.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Camera{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", accessURL='" + getAccessURL() + "'" +
            "}";
    }
}
