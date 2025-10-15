import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router)
  const currentUser = authService.currentUserValue;
  if (currentUser?.data.is_admin) {
    return true;
  }

  toastr.error("You don't have access to this page","Access Denied");
  router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
  return false;
};
