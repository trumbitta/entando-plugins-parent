/*
*
* Copyright 2010 AgileTec S.r.l. (http://www.agiletec.it) All rights reserved.
*
* This file is part of jAPS software.
* jAPS is a free software; 
* you can redistribute it and/or modify it
* under the terms of the GNU General Public License (GPL) as published by the Free Software Foundation; version 2.
* 
* See the file License for the specific language governing permissions   
* and limitations under the License
* 
* 
* 
* Copyright 2010 AgileTec S.r.l. (http://www.agiletec.it) All rights reserved.
*
*/
package com.agiletec.plugins.jpuserreg.apsadmin.portal.specialshowlet.userreg;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.agiletec.aps.system.ApsSystemUtils;
import com.agiletec.aps.system.common.entity.model.IApsEntity;
import com.agiletec.apsadmin.portal.specialshowlet.SimpleShowletConfigAction;
import com.agiletec.plugins.jpuserprofile.aps.system.services.ProfileSystemConstants;
import com.agiletec.plugins.jpuserprofile.aps.system.services.profile.IUserProfileManager;
import com.agiletec.plugins.jpuserreg.aps.JpUserRegSystemConstants;

public class UserRegShowletAction extends SimpleShowletConfigAction {
	
	@Override
	public void validate() {
		super.validate();
		try {
			boolean validType = false;
			String typeCode = this.getTypeCode();
			if (typeCode!=null) {
				IApsEntity entity = this.getUserProfileManager().getProfileType(typeCode);
				if (entity!=null && entity.getAttributeByRole(ProfileSystemConstants.ATTRIBUTE_ROLE_MAIL)!=null) {
					validType = true;
				}
			}
			if (!validType) {
				this.addFieldError("typeCode", this.getText("jpuserreg.error.typeCode.required"));
			}
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "validate");
		}
	}
	
	@Override
	public String init() {
		String result = super.init();
		try {
			if (result.equals(SUCCESS)) {
				String paramName = JpUserRegSystemConstants.TYPECODE_SHOWLET_PARAM;
				String typeCode = this.getShowlet().getConfig().getProperty(paramName);
				this.setTypeCode(typeCode);
			}
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "init");
			return FAILURE;
		}
		return result;
	}
	
	public List<IApsEntity> getProfileTypes() {
		if (this._profileTypes==null) {
			this._profileTypes = new ArrayList<IApsEntity>();
			Iterator<IApsEntity> prototypesIter = this.getUserProfileManager().getEntityPrototypes().values().iterator();
			while (prototypesIter.hasNext()) {
				IApsEntity profile = prototypesIter.next();
				if (profile.getAttributeByRole(ProfileSystemConstants.ATTRIBUTE_ROLE_MAIL)!=null) {
					this._profileTypes.add(profile);
				}
			}
		}
		return this._profileTypes;
	}
	
	public String getTypeCode() {
		return _typeCode;
	}
	public void setTypeCode(String typeCode) {
		this._typeCode = typeCode;
	}
	
	protected IUserProfileManager getUserProfileManager() {
		return _userProfileManager;
	}
	public void setUserProfileManager(IUserProfileManager userProfileManager) {
		this._userProfileManager = userProfileManager;
	}
	
	private String _typeCode;
	private List<IApsEntity> _profileTypes;
	
	private IUserProfileManager _userProfileManager;
	
}