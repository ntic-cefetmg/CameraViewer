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
 * A Screen.
 */
@Entity
@Table(name = "screen")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Screen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "screen_cameras",
               joinColumns = @JoinColumn(name="screens_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="cameras_id", referencedColumnName="id"))
    private Set<Camera> cameras = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "screen_users_with_access",
               joinColumns = @JoinColumn(name="screens_id", referencedColumnName="id"),
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

    public Screen description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Camera> getCameras() {
        return cameras;
    }

    public Screen cameras(Set<Camera> cameras) {
        this.cameras = cameras;
        return this;
    }

    public Screen addCameras(Camera camera) {
        this.cameras.add(camera);
        return this;
    }

    public Screen removeCameras(Camera camera) {
        this.cameras.remove(camera);
        return this;
    }

    public void setCameras(Set<Camera> cameras) {
        this.cameras = cameras;
    }

    public Set<User> getUsersWithAccesses() {
        return usersWithAccesses;
    }

    public Screen usersWithAccesses(Set<User> users) {
        this.usersWithAccesses = users;
        return this;
    }

    public Screen addUsersWithAccess(User user) {
        this.usersWithAccesses.add(user);
        return this;
    }

    public Screen removeUsersWithAccess(User user) {
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
        Screen screen = (Screen) o;
        if (screen.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), screen.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Screen{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
