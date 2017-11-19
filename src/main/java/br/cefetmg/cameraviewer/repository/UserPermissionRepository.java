package br.cefetmg.cameraviewer.repository;

import br.cefetmg.cameraviewer.domain.UserPermission;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the UserPermission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {
    @Query("select distinct user_permission from UserPermission user_permission left join fetch user_permission.camerasThatHaveAccesses")
    List<UserPermission> findAllWithEagerRelationships();

    @Query("select user_permission from UserPermission user_permission left join fetch user_permission.camerasThatHaveAccesses where user_permission.id =:id")
    UserPermission findOneWithEagerRelationships(@Param("id") Long id);

}
