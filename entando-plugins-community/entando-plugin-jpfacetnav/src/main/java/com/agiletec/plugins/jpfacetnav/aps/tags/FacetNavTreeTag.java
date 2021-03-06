/*
*
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
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
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
*/
package com.agiletec.plugins.jpfacetnav.aps.tags;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.jsp.JspException;

import com.agiletec.aps.system.ApsSystemUtils;
import com.agiletec.aps.system.RequestContext;
import com.agiletec.aps.system.SystemConstants;
import com.agiletec.aps.system.common.tree.ITreeNode;
import com.agiletec.aps.system.services.page.Showlet;
import com.agiletec.aps.util.ApsWebApplicationUtils;
import com.agiletec.plugins.jpfacetnav.aps.system.JpFacetNavSystemConstants;
import com.agiletec.plugins.jpfacetnav.aps.system.services.content.showlet.IFacetNavHelper;

/**
 * 
 * @author E.Santoboni
 */
public class FacetNavTreeTag extends AbstractFacetNavTag {
	
	@Override
	public int doStartTag() throws JspException {
		ServletRequest request =  this.pageContext.getRequest();
		RequestContext reqCtx = (RequestContext) request.getAttribute(RequestContext.REQCTX);
		try {
			List<String> requiredFacets = this.getRequiredFacets();
			
			IFacetNavHelper facetNavHelper = (IFacetNavHelper) ApsWebApplicationUtils.getBean(JpFacetNavSystemConstants.CONTENT_FACET_NAV_HELPER, this.pageContext);
			Map<String, Integer> occurrences = facetNavHelper.getOccurences(requiredFacets, reqCtx);
			
			List<ITreeNode> facetsForTree = this.getFacetRootNodes(reqCtx);
			this.pageContext.setAttribute(this.getFacetsTreeParamName(), facetsForTree);
			this.pageContext.setAttribute("occurrences", occurrences);
			request.setAttribute(this.getRequiredFacetsParamName(), requiredFacets);
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "doStartTag");
			throw new JspException("Error initialization tag", t);
		}
		return super.doStartTag();
	}
	
	protected List<ITreeNode> getFacetRootNodes(RequestContext reqCtx) {
		List<ITreeNode> facets = null;
		Showlet currentShowlet = (Showlet) reqCtx.getExtraParam(SystemConstants.EXTRAPAR_CURRENT_SHOWLET);
		String configParamName = JpFacetNavSystemConstants.FACET_ROOTS_SHOWLET_PARAM_NAME;
		String facetParamConfig = currentShowlet.getConfig().getProperty(configParamName);
		if (null != facetParamConfig && facetParamConfig.trim().length()>0) {
			facets = super.getFacetRoots(facetParamConfig);
		}
		return facets;
	}
	
	public String getFacetsTreeParamName() {
		return _facetsTreeParamName;
	}
	public void setFacetsTreeParamName(String facetsTreeParamName) {
		this._facetsTreeParamName = facetsTreeParamName;
	}
	
	private String _facetsTreeParamName;
	
}
